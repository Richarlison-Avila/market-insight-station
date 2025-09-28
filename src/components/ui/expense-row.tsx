import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";

interface ExpenseRowProps {
  expense: {
    id: number;
    description: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: (expense: any) => void;
  onCancel: () => void;
}

export function ExpenseRow({ expense, isEditing, onEdit, onSave, onCancel }: ExpenseRowProps) {
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleSave = () => {
    onSave(editedExpense);
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

  if (isEditing) {
    return (
      <TableRow className="hover:bg-muted/50">
        <TableCell>
          <Input
            value={editedExpense.description}
            onChange={(e) => setEditedExpense({...editedExpense, description: e.target.value})}
            className="mb-1"
          />
          <Input
            type="date"
            value={editedExpense.date}
            onChange={(e) => setEditedExpense({...editedExpense, date: e.target.value})}
            className="text-sm"
          />
        </TableCell>
        
        <TableCell>
          <Input
            value={editedExpense.category}
            onChange={(e) => setEditedExpense({...editedExpense, category: e.target.value})}
          />
        </TableCell>
        
        <TableCell>
          <Input
            type="number"
            step="0.01"
            value={editedExpense.amount}
            onChange={(e) => setEditedExpense({...editedExpense, amount: parseFloat(e.target.value) || 0})}
          />
        </TableCell>
        
        <TableCell>
          {getStatusBadge(editedExpense.status)}
        </TableCell>

        <TableCell>
          <div className="flex gap-1">
            <Button size="sm" variant="default" onClick={handleSave}>
              <Save className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="font-medium text-foreground">
          {expense.description}
        </div>
        <div className="text-sm text-muted-foreground">
          {expense.date}
        </div>
      </TableCell>
      
      <TableCell>
        <Badge variant="outline">{expense.category}</Badge>
      </TableCell>
      
      <TableCell>
        <span className="font-medium text-destructive">
          -R$ {expense.amount.toFixed(2)}
        </span>
      </TableCell>
      
      <TableCell>
        {getStatusBadge(expense.status)}
      </TableCell>

      <TableCell>
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Pencil className="h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
}