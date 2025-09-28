import { DollarSign, TrendingUp, ShoppingCart, Target, Copy } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { SalesChart } from "@/components/charts/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data - substituir por dados da API
const salesData = [
  { date: "01/01", vendas: 2400, lucro: 1200 },
  { date: "02/01", vendas: 1398, lucro: 800 },
  { date: "03/01", vendas: 9800, lucro: 4500 },
  { date: "04/01", vendas: 3908, lucro: 2100 },
  { date: "05/01", vendas: 4800, lucro: 2800 },
  { date: "06/01", vendas: 3800, lucro: 2200 },
  { date: "07/01", vendas: 4300, lucro: 2650 },
];

const trendingProducts = [
  {
    id: 1,
    name: "Smartwatch Fitness Pro",
    ranking: 1,
    commission: 15.5,
    estimatedProfit: 85.20,
    category: "Tecnologia",
    affiliateLink: "https://example.com/affiliate/product1",
  },
  {
    id: 2,
    name: "Kit Skincare Premium",
    ranking: 2,
    commission: 22.0,
    estimatedProfit: 120.50,
    category: "Beleza",
    affiliateLink: "https://example.com/affiliate/product2",
  },
  {
    id: 3,
    name: "Curso Marketing Digital",
    ranking: 3,
    commission: 40.0,
    estimatedProfit: 200.00,
    category: "Educação",
    affiliateLink: "https://example.com/affiliate/product3",
  },
];

export default function Dashboard() {
  const { toast } = useToast();

  const copyAffiliateLink = (link: string, productName: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: `Link de afiliado para "${productName}" copiado para a área de transferência.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral das suas vendas e oportunidades
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Vendas Hoje"
          value="R$ 4.320"
          change="+12.5% vs ontem"
          changeType="positive"
          icon={ShoppingCart}
          variant="primary"
        />
        <MetricCard
          title="Lucro Líquido"
          value="R$ 2.650"
          change="+8.2% vs ontem"
          changeType="positive"
          icon={DollarSign}
          variant="success"
        />
        <MetricCard
          title="Conversão"
          value="3.4%"
          change="+0.5% vs média"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Saldo Atual"
          value="R$ 18.540"
          change="Atualizado agora"
          changeType="neutral"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Evolução de Vendas (7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={salesData} height={350} />
          </CardContent>
        </Card>

        {/* Trending Products */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              Produtos em Destaque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-border bg-background/50 p-4 transition-all hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        #{product.ranking}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium text-sm text-foreground mb-2">
                      {product.name}
                    </h4>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Comissão:</span>
                        <span className="font-medium text-foreground">
                          {product.commission}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Lucro est.:</span>
                        <span className="font-medium text-success">
                          R$ {product.estimatedProfit.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => copyAffiliateLink(product.affiliateLink, product.name)}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copiar Link
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}