import { useState } from "react";
import { Search, Filter, Copy, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Plataformas
const platforms = [
  "Todas",
  "Mercado Livre", 
  "Shopee", 
  "Amazon", 
  "Hotmart",
  "Monetizze",
  "Eduzz"
];

// Mock data - substituir por dados da API  
const productsByPlatform = {
  "Mercado Livre": [
    {
      id: 1,
      name: "Smartwatch Fitness Pro Max",
      category: "Tecnologia",
      niche: "Fitness & Saúde",
      ranking: 1,
      commission: 15.5,
      totalValue: 549.90,
      estimatedProfit: 85.20,
      netProfit: 68.15,
      trend: "up",
      affiliateLink: "https://mercadolivre.com.br/affiliate/product1",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Tênis Esportivo Profissional",
      category: "Esportes",
      niche: "Corrida & Atletismo",
      ranking: 2,
      commission: 12.5,
      totalValue: 299.90,
      estimatedProfit: 75.30,
      netProfit: 60.24,
      trend: "up",
      affiliateLink: "https://mercadolivre.com.br/affiliate/product2",
      rating: 4.5,
    }
  ],
  "Shopee": [
    {
      id: 3,
      name: "Kit Skincare Premium Completo",
      category: "Beleza",
      niche: "Cuidados Faciais",
      ranking: 1,
      commission: 22.0,
      totalValue: 189.90,
      estimatedProfit: 120.50,
      netProfit: 96.40,
      trend: "up",
      affiliateLink: "https://shopee.com.br/affiliate/product3",
      rating: 4.9,
    }
  ],
  "Amazon": [
    {
      id: 4,
      name: "Echo Dot (5ª Geração)",
      category: "Tecnologia", 
      niche: "Casa Inteligente",
      ranking: 1,
      commission: 8.0,
      totalValue: 349.00,
      estimatedProfit: 27.92,
      netProfit: 22.34,
      trend: "stable",
      affiliateLink: "https://amazon.com.br/affiliate/product4",
      rating: 4.7,
    }
  ],
  "Hotmart": [
    {
      id: 5,
      name: "Curso Marketing Digital Avançado",
      category: "Educação",
      niche: "Marketing Online", 
      ranking: 1,
      commission: 40.0,
      totalValue: 497.00,
      estimatedProfit: 200.00,
      netProfit: 160.00,
      trend: "up",
      affiliateLink: "https://hotmart.com/affiliate/product5",
      rating: 4.8,
    }
  ],
  "Monetizze": [
    {
      id: 6,
      name: "Ebook Receitas Fitness",
      category: "Saúde",
      niche: "Alimentação Saudável",
      ranking: 1,
      commission: 50.0,
      totalValue: 67.00,
      estimatedProfit: 33.50,
      netProfit: 26.80,
      trend: "up",
      affiliateLink: "https://monetizze.com.br/affiliate/product6", 
      rating: 4.6,
    }
  ],
  "Eduzz": [
    {
      id: 7,
      name: "Curso de Inglês Online",
      category: "Educação",
      niche: "Idiomas",
      ranking: 1,
      commission: 35.0,
      totalValue: 297.00,
      estimatedProfit: 103.95,
      netProfit: 83.16,
      trend: "stable",
      affiliateLink: "https://eduzz.com/affiliate/product7",
      rating: 4.4,
    }
  ]
};

const categories = ["Todos", "Tecnologia", "Beleza", "Educação", "Saúde", "Esportes"];

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("ranking");
  const [activePlatform, setActivePlatform] = useState("Mercado Livre");
  const { toast } = useToast();

  // Combina todos os produtos ou filtra por plataforma
  const allProducts = activePlatform === "Todas" 
    ? Object.values(productsByPlatform).flat()
    : productsByPlatform[activePlatform] || [];

  const filteredProducts = allProducts
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
        case "totalValue":
          return b.totalValue - a.totalValue;
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

      {/* Platform Tabs */}
      <Tabs value={activePlatform} onValueChange={setActivePlatform} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          {platforms.map((platform) => (
            <TabsTrigger key={platform} value={platform} className="text-xs">
              {platform === "Todas" ? "Todas" : platform}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activePlatform} className="space-y-6">
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
                    <SelectItem value="totalValue">Valor Total</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>
                Produtos {activePlatform !== "Todas" && `- ${activePlatform}`} ({filteredProducts.length})
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
                      <TableHead>Nicho</TableHead>
                      <TableHead>Valor Total</TableHead>
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
                          <Badge variant="secondary" className="text-xs">
                            {product.niche}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <span className="font-medium text-foreground">
                            R$ {product.totalValue.toFixed(2)}
                          </span>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}