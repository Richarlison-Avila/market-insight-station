import { useState } from "react";
import { Search, Filter, Copy, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock data - substituir por dados da API
const products = [
  {
    id: 1,
    name: "Smartwatch Fitness Pro Max",
    category: "Tecnologia",
    ranking: 1,
    commission: 15.5,
    estimatedProfit: 85.20,
    netProfit: 68.15,
    trend: "up",
    affiliateLink: "https://example.com/affiliate/product1",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Kit Skincare Premium Completo",
    category: "Beleza",
    ranking: 2,
    commission: 22.0,
    estimatedProfit: 120.50,
    netProfit: 96.40,
    trend: "up",
    affiliateLink: "https://example.com/affiliate/product2",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Curso Marketing Digital Avançado",
    category: "Educação",
    ranking: 3,
    commission: 40.0,
    estimatedProfit: 200.00,
    netProfit: 160.00,
    trend: "stable",
    affiliateLink: "https://example.com/affiliate/product3",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Suplemento Whey Protein Premium",
    category: "Saúde",
    ranking: 4,
    commission: 18.0,
    estimatedProfit: 95.40,
    netProfit: 76.32,
    trend: "down",
    affiliateLink: "https://example.com/affiliate/product4",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Tênis Esportivo Profissional",
    category: "Esportes",
    ranking: 5,
    commission: 12.5,
    estimatedProfit: 75.30,
    netProfit: 60.24,
    trend: "up",
    affiliateLink: "https://example.com/affiliate/product5",
    rating: 4.5,
  },
];

const categories = ["Todos", "Tecnologia", "Beleza", "Educação", "Saúde", "Esportes"];

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("ranking");
  const { toast } = useToast();

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking;
        case "commission":
          return b.commission - a.commission;
        case "profit":
          return b.netProfit - a.netProfit;
        default:
          return 0;
      }
    });

  const copyAffiliateLink = (link: string, productName: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: `Link de afiliado para "${productName}" copiado.`,
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
        <p className="text-muted-foreground">
          Descubra os produtos mais promissores para suas campanhas
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">Ranking</SelectItem>
                <SelectItem value="commission">Comissão</SelectItem>
                <SelectItem value="profit">Lucro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>
            Produtos Promissores ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ranking</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Lucro Est.</TableHead>
                  <TableHead>Lucro Líq.</TableHead>
                  <TableHead>Tendência</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        #{product.ranking}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-medium text-foreground max-w-xs">
                        {product.name}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium text-primary">
                        {product.commission}%
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium text-foreground">
                        R$ {product.estimatedProfit.toFixed(2)}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-medium text-success">
                        R$ {product.netProfit.toFixed(2)}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-lg">{getTrendIcon(product.trend)}</span>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyAffiliateLink(product.affiliateLink, product.name)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
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