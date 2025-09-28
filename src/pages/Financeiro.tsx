import { DollarSign, TrendingUp, TrendingDown, CreditCard, AlertCircle, Plus, Pencil, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { SalesChart } from "@/components/charts/SalesChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseRow } from "@/components/ui/expense-row";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Mock data - substituir por dados da API
const financialData = [
  { date: "01/01", vendas: 2400, lucro: 1200 },
  { date: "02/01", vendas: 1398, lucro: 800 },
  { date: "03/01", vendas: 9800, lucro: 4500 },
  { date: "04/01", vendas: 3908, lucro: 2100 },
  { date: "05/01", vendas: 4800, lucro: 2800 },
  { date: "06/01", vendas: 3800, lucro: 2200 },
  { date: "07/01", vendas: 4300, lucro: 2650 },
];

const expenses = [
  {
    id: 1,
    description: "Anúncios Facebook Ads",
    category: "Marketing",
    amount: 850.00,
    date: "2024-01-05",
    status: "Pago",
  },
  {
    id: 2,
    description: "Hospedagem Landing Pages",
    category: "Tecnologia",
    amount: 49.90,
    date: "2024-01-03",
    status: "Pago",
  },
  {
    id: 3,
    description: "Ferramenta de Analytics",
    category: "Tecnologia",
    amount: 89.00,
    date: "2024-01-01",
    status: "Pendente",
  },
];

const initialExpenses = [...expenses];

const pendingPayments = [
  {
    id: 1,
    platform: "Hotmart",
    amount: 2450.80,
    date: "2024-01-15",
    status: "Aguardando",
  },
  {
    id: 2,
    platform: "Monetizze",
    amount: 1890.50,
    date: "2024-01-12",
    status: "Processando",
  },
  {
    id: 3,
    platform: "Eduzz",
    amount: 985.30,
    date: "2024-01-10",
    status: "Liberado",
  },
];

export default function Financeiro() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [editingExpense, setEditingExpense] = useState<number | null>(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const currentBalance = 18540.75;
  const netProfit = currentBalance - totalExpenses;

  const handleSaveExpense = (expense: any) => {
    if (editingExpense) {
      setExpenses(expenses.map(e => e.id === editingExpense ? expense : e));
      setEditingExpense(null);
    }
  };

  const handleAddExpense = () => {
    const newId = Math.max(...expenses.map(e => e.id)) + 1;
    const expenseToAdd = {
      id: newId,
      ...newExpense,
      status: "Pendente"
    };
    setExpenses([...expenses, expenseToAdd]);
    setNewExpense({
      description: "",
      category: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0]
    });
    setIsAddingExpense(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
      case "Liberado":
        return <Badge className="bg-success text-success-foreground">{status}</Badge>;
      case "Pendente":
      case "Aguardando":
      case "Processando":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground">
          Controle completo das suas finanças e fluxo de caixa
        </p>
      </div>

      {/* Financial Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Saldo Atual"
          value={`R$ ${currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="+5.2% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          variant="success"
        />
        <MetricCard
          title="Lucro Líquido"
          value={`R$ ${netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="+12.8% vs mês anterior"
          changeType="positive"
          icon={TrendingUp}
          variant="primary"
        />
        <MetricCard
          title="Total Gastos"
          value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="-8.4% vs mês anterior"
          changeType="positive"
          icon={TrendingDown}
          variant="warning"
        />
        <MetricCard
          title="Pendente Receber"
          value={`R$ ${totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="3 pagamentos"
          changeType="neutral"
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Financial Chart */}
        <Card className="lg:col-span-2 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Evolução Financeira (30 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={financialData} height={350} />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Balance Alert */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-warning" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-warning/10 border border-warning/20 p-3">
                <p className="text-sm font-medium text-warning-foreground">
                  Pagamento pendente há 5 dias
                </p>
                <p className="text-sm text-muted-foreground">
                  Hotmart - R$ 2.450,80
                </p>
              </div>
              
              <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                <p className="text-sm font-medium text-success-foreground">
                  Meta mensal atingida!
                </p>
                <p className="text-sm text-muted-foreground">
                  102% da meta de R$ 15.000
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expenses */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Gastos Recentes</CardTitle>
              <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Gasto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Gasto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                        placeholder="Ex: Anúncios Google Ads"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Input
                        id="category"
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                        placeholder="Ex: Marketing"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Valor</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddExpense} className="flex-1">
                        Adicionar
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <ExpenseRow 
                      key={expense.id}
                      expense={expense}
                      isEditing={editingExpense === expense.id}
                      onEdit={() => setEditingExpense(expense.id)}
                      onSave={handleSaveExpense}
                      onCancel={() => setEditingExpense(null)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Pagamentos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {payment.platform}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <span className="font-medium text-success">
                          +R$ {payment.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      
                      <TableCell className="text-muted-foreground">
                        {payment.date}
                      </TableCell>
                      
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}