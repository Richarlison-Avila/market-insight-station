import { useState } from "react";
import { Calendar, Filter, Download, TrendingUp, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricCard } from "@/components/ui/metric-card";

// Mock data - substituir por dados da API
const salesHistory = [
  {
    id: 1,
    date: "2024-01-07 14:32",
    product: "Smartwatch Fitness Pro",
    niche: "Fitness & Saúde",
    customer: "João S.",
    value: 299.90,
    commission: 46.48,
    status: "Aprovada",
  },
  {
    id: 2,
    date: "2024-01-07 11:15",
    product: "Kit Skincare Premium",
    niche: "Cuidados Faciais",
    customer: "Maria L.",
    value: 189.50,
    commission: 41.69,
    status: "Aprovada",
  },
  {
    id: 3,
    date: "2024-01-06 16:45",
    product: "Curso Marketing Digital",
    niche: "Marketing Online",
    customer: "Carlos M.",
    value: 497.00,
    commission: 198.80,
    status: "Pendente",
  },
  {
    id: 4,
    date: "2024-01-06 09:22",
    product: "Suplemento Whey Protein",
    niche: "Alimentação Saudável",
    customer: "Ana P.",
    value: 159.90,
    commission: 28.78,
    status: "Aprovada",
  },
  {
    id: 5,
    date: "2024-01-05 20:10",
    product: "Tênis Esportivo Pro",
    niche: "Corrida & Atletismo",
    customer: "Pedro R.",
    value: 249.90,
    commission: 31.24,
    status: "Cancelada",
  },
];

export default function Vendas() {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [periodFilter, setPeriodFilter] = useState("7dias");

  const filteredSales = salesHistory.filter((sale) => {
    return statusFilter === "Todos" || sale.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovada":
        return <Badge className="bg-success text-success-foreground">Aprovada</Badge>;
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>;
      case "Cancelada":
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.value, 0);
  const totalCommissions = filteredSales.reduce((sum, sale) => sum + sale.commission, 0);
  const approvedSales = filteredSales.filter(sale => sale.status === "Aprovada").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendas</h1>
        <p className="text-muted-foreground">
          Histórico detalhado das suas vendas e comissões
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Vendas Hoje"
          value="R$ 4.320"
          change="+12.5%"
          changeType="positive"
          icon={ShoppingCart}
          variant="primary"
        />
        <MetricCard
          title="Vendas Semana"
          value="R$ 18.540"
          change="+8.2%"
          changeType="positive"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Vendas Mês"
          value="R$ 67.230"
          change="+15.8%"
          changeType="positive"
          icon={Calendar}
        />
        <MetricCard
          title="Total Comissões"
          value={`R$ ${totalCommissions.toFixed(2)}`}
          change={`${approvedSales} aprovadas`}
          changeType="positive"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Filters and Actions */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros e Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Aprovada">Aprovada</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>

              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales History Table */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>
            Histórico de Vendas ({filteredSales.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Nicho</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">
                      {sale.date}
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-medium text-foreground max-w-xs">
                        {sale.product}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {sale.niche}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="text-muted-foreground">
                      {sale.customer}
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium text-foreground">
                        R$ {sale.value.toFixed(2)}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium text-success">
                        R$ {sale.commission.toFixed(2)}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      {getStatusBadge(sale.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}