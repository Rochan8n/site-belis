"use client";

import { useEffect, useRef, useState, type DragEvent, type PointerEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Package,
  Wrench,
  Receipt,
  CheckCircle2,
  Car,
  Users,
  BarChart3,
  AlertCircle,
  LayoutDashboard,
  Search,
  Plus,
  Eye,
  Zap,
  Bell,
  Timer,
  GripVertical,
} from "lucide-react";
import styles from "./systems.module.css";

type Sla = "green" | "amber" | "red";

type Card = {
  id: string;
  plate: string;
  brand: string;
  status?: string;
  statusColor?: "green" | "amber" | "red";
  time: string;
  sla: Sla;
  urgent?: boolean;
  bell?: boolean;
  timerPct?: number;
  pieces?: string;
  action?: { label: string; color: "green" | "amber" };
};

type Column = { title: string; color: string; cards: Card[] };

const NAV = [LayoutDashboard, ClipboardList, Car, Users, BarChart3, AlertCircle, Wrench, Package, Receipt];

const INITIAL: Column[] = [
  {
    title: "Orçamento",
    color: "#85858f",
    cards: [
      {
        id: "c1", plate: "BRA2E19", brand: "Corolla · Prata",
        status: "Ag. Aprovação", statusColor: "amber", time: "1h 20m", sla: "green",
        bell: true, action: { label: "Cliente Aprovou", color: "green" },
      },
    ],
  },
  {
    title: "Aguardando Peças",
    color: "#db1f27",
    cards: [
      {
        id: "c2", plate: "EPO5511", brand: "X5M · Preto",
        status: "Fornecedor atrasado", statusColor: "amber", time: "5h 45m", sla: "amber",
        pieces: "2/4 peças",
      },
    ],
  },
  {
    title: "Peças OK / Fila",
    color: "#db1f27",
    cards: [
      {
        id: "c3", plate: "HBG1234", brand: "C280 · Branco",
        status: "Pronto para iniciar", statusColor: "green", time: "0h 15m", sla: "green",
      },
    ],
  },
  {
    title: "Produção",
    color: "#db1f27",
    cards: [
      {
        id: "c4", plate: "CWF6D68", brand: "Evoque · Cinza",
        status: "Em reparo", statusColor: "green", time: "4h 10m", sla: "amber",
        urgent: true, timerPct: 72,
      },
    ],
  },
  { title: "Entrega", color: "#34d05f", cards: [] },
  { title: "Cobrança", color: "#85858f", cards: [] },
  { title: "Concluídos", color: "#34d05f", cards: [] },
];

// When a card lands in a column, its content reflects that stage.
const ZONE: Record<string, Partial<Card>> = {
  "Orçamento": { status: "Ag. Aprovação", statusColor: "amber", sla: "green", bell: true, action: { label: "Cliente Aprovou", color: "green" }, timerPct: undefined, pieces: undefined, urgent: false },
  "Aguardando Peças": { status: "Aguardando peças", statusColor: "amber", sla: "green", pieces: "0/3 peças", bell: false, action: undefined, timerPct: undefined },
  "Peças OK / Fila": { status: "Fila p/ técnico", statusColor: "green", sla: "green", pieces: undefined, bell: false, action: { label: "Iniciar reparo", color: "green" }, timerPct: undefined },
  "Produção": { status: "Em reparo", statusColor: "green", sla: "green", bell: false, action: undefined, timerPct: 5, pieces: undefined },
  "Entrega": { status: "Pronto p/ entrega", statusColor: "green", sla: "green", bell: false, action: { label: "Cobrar", color: "amber" }, timerPct: undefined, urgent: false, pieces: undefined },
  "Cobrança": { status: "Ag. Pagamento", statusColor: "amber", sla: "amber", bell: false, action: { label: "Pago ✓", color: "green" }, timerPct: undefined, urgent: false },
  "Concluídos": { status: "Finalizado ✓", statusColor: "green", sla: "green", bell: false, action: undefined, timerPct: undefined, urgent: false },
};

function slaClass(sla: Sla) {
  return sla === "green" ? styles.green : sla === "amber" ? styles.amber : styles.red;
}

export function MecaproKanban() {
  const [columns, setColumns] = useState<Column[]>(INITIAL);
  const [drag, setDrag] = useState<{ col: number; card: number } | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [toast, setToast] = useState<{ plate: string; dest: string } | null>(null);
  const [ready, setReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<{ col: number; card: number } | null>(null);
  const pointerRef = useRef(false);

  useEffect(() => { dragRef.current = drag; }, [drag]);

  // Reveal + one auto demo move when scrolled into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setReady(true);
        const t = setTimeout(() => moveCard(2, 0, 3), 1800);
        return () => clearTimeout(t);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveCard = (from: number, cardIdx: number, to: number) => {
    let plate = "";
    let dest = "";
    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, cards: [...c.cards] }));
      const card = next[from]?.cards[cardIdx];
      if (!card || from === to) return prev;
      plate = card.plate;
      dest = next[to].title;
      const [removed] = next[from].cards.splice(cardIdx, 1);
      next[to].cards.push({ ...removed, ...ZONE[dest] });
      return next;
    });
    setTimeout(() => {
      if (!plate) return;
      setToast({ plate, dest });
      setTimeout(() => setToast(null), 3800);
    }, 0);
  };

  const colAt = (x: number, y: number): number | null => {
    for (let i = 0; i < colRefs.current.length; i++) {
      const r = colRefs.current[i]?.getBoundingClientRect();
      if (r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return i;
    }
    return null;
  };

  // HTML5 drag (desktop)
  const onDragStart = (e: DragEvent, col: number, card: number) => {
    setDrag({ col, card });
    e.dataTransfer.effectAllowed = "move";
  };
  const onDrop = (e: DragEvent, to: number) => {
    e.preventDefault();
    if (drag && drag.col !== to) moveCard(drag.col, drag.card, to);
    setDrag(null);
    setOver(null);
  };

  // Pointer drag (touch / fallback)
  const onPointerDown = (e: PointerEvent, col: number, card: number) => {
    if (!ready) return;
    pointerRef.current = true;
    dragRef.current = { col, card };
    setDrag({ col, card });
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* noop */ }
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!pointerRef.current) return;
    setOver(colAt(e.clientX, e.clientY));
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!pointerRef.current) return;
    pointerRef.current = false;
    const to = colAt(e.clientX, e.clientY);
    const d = dragRef.current;
    if (d && to !== null && to !== d.col) moveCard(d.col, d.card, to);
    dragRef.current = null;
    setDrag(null);
    setOver(null);
  };

  return (
    <div ref={rootRef} className={styles.mp}>
      <div className={styles.mpGlow} />

      <aside className={styles.mpSidebar}>
        <div className={styles.mpLogo}><span>M</span></div>
        <nav className={styles.mpNav}>
          {NAV.map((Icon, i) => (
            <div key={i} className={`${styles.mpNavItem} ${i === 2 ? styles.active : ""}`}>
              <Icon size={15} />
            </div>
          ))}
        </nav>
      </aside>

      <div className={styles.mpMain}>
        <div className={styles.mpTop}>
          <div>
            <h4 className={styles.mpTopTitle}>Painel de Comando: Pátio</h4>
            <div className={styles.mpTabs}>
              {["Kanban", "Por Técnico", "Alertas e Gargalos", "Auditoria"].map((t, i) => (
                <span key={t} className={i === 0 ? styles.on : ""}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.mpTopRight}>
            <div className={styles.mpSearch}><Search size={12} /> Buscar...</div>
            <div className={styles.mpNewOs}><Plus size={12} /> NOVA OS</div>
          </div>
        </div>

        <div className={styles.mpBoard}>
          {columns.map((col, ci) => (
            <div
              key={col.title}
              ref={(el) => { colRefs.current[ci] = el; }}
              className={`${styles.mpCol} ${over === ci && drag?.col !== ci ? styles.over : ""}`}
              onDragOver={(e) => { e.preventDefault(); setOver(ci); }}
              onDragLeave={(e) => {
                const rel = e.relatedTarget as Node | null;
                if (rel && (e.currentTarget as HTMLElement).contains(rel)) return;
                setOver(null);
              }}
              onDrop={(e) => onDrop(e, ci)}
            >
              <div className={styles.mpColHead}>
                <div className={styles.mpColRule} style={{ background: col.color }} />
                <span>{col.title}</span>
              </div>

              <div className={styles.mpCards}>
                <AnimatePresence mode="popLayout">
                  {col.cards.map((card, cardIdx) => (
                    <KanbanCard
                      key={card.id}
                      card={card}
                      draggable={ready}
                      onDragStart={(e) => onDragStart(e, ci, cardIdx)}
                      onDragEnd={() => { setDrag(null); setOver(null); }}
                      onPointerDown={(e) => onPointerDown(e, ci, cardIdx)}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                    />
                  ))}
                </AnimatePresence>
                {col.cards.length === 0 && (
                  <div className={styles.mpEmpty}>Nenhum veículo nesta zona</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {toast && (
          <div className={styles.mpToast}>
            <CheckCircle2 size={15} className={styles.mpToastIcon} />
            <span>
              <b>{toast.plate}</b> movido para <span className={styles.dest}>{toast.dest}</span> — fila do mecânico atualizada
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

type CardProps = {
  card: Card;
  draggable: boolean;
  onDragStart: (e: DragEvent) => void;
  onDragEnd: () => void;
  onPointerDown: (e: PointerEvent) => void;
  onPointerMove: (e: PointerEvent) => void;
  onPointerUp: (e: PointerEvent) => void;
};

function KanbanCard({ card, draggable, onDragStart, onDragEnd, onPointerDown, onPointerMove, onPointerUp }: CardProps) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (card.timerPct === undefined) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [card.timerPct]);

  const badgeClass = card.statusColor === "green" ? styles.green : card.statusColor === "red" ? styles.red : styles.amber;

  return (
    <motion.div
      layout
      initial={{ scale: 0.85, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: -8 }}
      transition={{ layout: { type: "spring", stiffness: 300, damping: 30 }, duration: 0.35 }}
    >
      <div
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ touchAction: "none" }}
        className={`${styles.mpCard} ${slaClass(card.sla)} ${card.urgent ? styles.urgent : ""}`}
      >
        <div className={styles.mpCardTop}>
          <span className={styles.mpPlate}>
            {card.urgent && <span style={{ color: "#db1f27" }}>⚡</span>}
            {card.plate}
            {card.bell && <Bell size={10} style={{ color: "#f0a83a" }} />}
          </span>
          {draggable && <GripVertical size={11} style={{ opacity: 0.3 }} />}
        </div>

        <p className={styles.mpBrand}>{card.brand}</p>

        {card.status && <span className={`${styles.mpBadge} ${badgeClass}`}>{card.status}</span>}
        {card.pieces && <div><span className={styles.mpPieces}>📦 {card.pieces}</span></div>}

        {card.timerPct !== undefined && (
          <div className={styles.mpTimer}>
            <div className={styles.mpTimerHead}>
              <span><Timer size={9} /> Em reparo</span>
              <span>
                {String(Math.floor((card.timerPct + tick) / 60) % 60).padStart(2, "0")}:
                {String((card.timerPct + tick) % 60).padStart(2, "0")} h
              </span>
            </div>
            <div className={styles.mpBarTrack}>
              <div
                className={styles.mpBarFill}
                style={{
                  width: `${Math.min(card.timerPct + tick * 0.01, 100)}%`,
                  background: card.timerPct >= 100 ? "#db1f27" : card.timerPct >= 80 ? "#f0a83a" : "#34d05f",
                }}
              />
            </div>
            <div className={styles.mpPct}>{card.timerPct}% do orçado</div>
          </div>
        )}

        <div className={styles.mpCardFoot}>
          <span className={`${styles.mpTime} ${slaClass(card.sla)}`}>{card.time}</span>
          {card.action ? (
            <span className={`${styles.mpAction} ${card.action.color === "green" ? styles.green : styles.amber}`}>
              {card.action.label}
            </span>
          ) : (
            <div className={styles.mpFootIcons}><Eye size={11} /><Zap size={11} /></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
