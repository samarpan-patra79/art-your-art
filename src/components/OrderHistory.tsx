import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Order } from "@/data/products";

interface OrderHistoryProps {
  orders: Order[];
}

const statusConfig: Record<Order["status"], { icon: JSX.Element; color: string; bg: string }> = {
  Delivered: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-700",
    bg: "bg-green-100 border-green-200",
  },
  "In Transit": {
    icon: <Truck className="w-4 h-4" />,
    color: "text-blue-700",
    bg: "bg-blue-100 border-blue-200",
  },
  Processing: {
    icon: <Clock className="w-4 h-4" />,
    color: "text-amber-700",
    bg: "bg-amber-100 border-amber-200",
  },
};

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10" data-testid="order-history">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Account</p>
        <h2
          className="text-3xl font-bold text-foreground mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          My Orders
        </h2>
        <p className="text-muted-foreground text-sm">
          {orders.length} {orders.length === 1 ? "order" : "orders"} in your history
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block" aria-hidden="true">📦</span>
          <h3
            className="text-xl font-bold text-foreground mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            No orders yet
          </h3>
          <p className="text-sm text-muted-foreground">Your order history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const cfg = statusConfig[order.status];
            return (
              <div
                key={order.id}
                className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-md transition-shadow"
                data-testid={`order-card-${order.id}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded"
                            data-testid={`order-id-${order.id}`}
                          >
                            {order.id}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-foreground text-base"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          data-testid={`order-name-${order.id}`}
                        >
                          {order.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Ordered on {order.date}</p>
                      </div>

                      <div className="text-right">
                        <p
                          className="text-lg font-bold text-primary"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          data-testid={`order-amount-${order.id}`}
                        >
                          {order.amount}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border mt-1 ${cfg.color} ${cfg.bg}`}
                          data-testid={`order-status-${order.id}`}
                        >
                          {cfg.icon}
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
