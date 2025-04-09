
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  // Sample data - in a real app, this would come from the backend
  const categoryData = [
    { name: "WIS", value: 4 },
    { name: "ETS", value: 2 },
    { name: "MIS ONE", value: 3 },
    { name: "Sales", value: 1 },
    { name: "Support", value: 1 },
    { name: "Tech", value: 2 },
  ];
  
  const activityData = [
    { name: "Approved", value: 24 },
    { name: "Rejected", value: 13 },
    { name: "Suggestions", value: 8 },
  ];
  
  const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#0088FE", "#8884d8", "#82ca9d"];
  
  // Enhanced suggestions data with category information
  const recentSuggestions = [
    { 
      cardContent: "I believe pineapple belongs on pizza", 
      suggestion: "It depends on the pizza type", 
      date: "2 days ago",
      category: "WIS" 
    },
    { 
      cardContent: "I enjoy going to museums on weekends", 
      suggestion: "Try art galleries too", 
      date: "5 days ago",
      category: "ETS" 
    },
    { 
      cardContent: "I think cats are better than dogs", 
      suggestion: "Both have their own charms", 
      date: "1 week ago",
      category: "MIS ONE" 
    },
    { 
      cardContent: "We should implement dark mode in our app", 
      suggestion: "Consider using a theme toggle", 
      date: "3 days ago",
      category: "Tech" 
    },
    { 
      cardContent: "Our sales strategy needs improvement", 
      suggestion: "Focus more on customer retention", 
      date: "4 days ago",
      category: "Sales" 
    },
    { 
      cardContent: "Customer support response time is too long", 
      suggestion: "Add automated initial responses", 
      date: "2 days ago",
      category: "Support" 
    },
  ];

  // Group suggestions by category
  const suggestionsByCategory = recentSuggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, typeof recentSuggestions>);

  // Get sorted category names
  const categoryNames = Object.keys(suggestionsByCategory).sort();

  return (
    <div className="pb-24 bg-gradient-to-b from-dating-lightgray to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-dating-yellow">Dashboard</span>
          </h1>
          <p className="text-dating-darkgray mt-2">Insights and activity</p>
        </header>
        
        <Tabs defaultValue="overview" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Categories</CardTitle>
                <CardDescription>Distribution of cards by category</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Your interactions with cards</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions" className="space-y-6">
            <div className="grid gap-6">
              {categoryNames.map((category) => (
                <Card key={category}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{category}</CardTitle>
                      <Badge className="bg-dating-yellow text-black">{suggestionsByCategory[category].length}</Badge>
                    </div>
                    <CardDescription>Suggestions for {category} cards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {suggestionsByCategory[category].map((item, index) => (
                        <div key={index} className="border-b pb-4 last:border-0">
                          <div className="font-medium text-sm">{item.cardContent}</div>
                          <div className="text-sm mt-1">Your suggestion: "{item.suggestion}"</div>
                          <div className="text-xs text-muted-foreground mt-1">{item.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
