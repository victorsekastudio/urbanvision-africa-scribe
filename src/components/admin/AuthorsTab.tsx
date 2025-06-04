
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit } from "lucide-react";

interface AuthorsTabProps {
  authors: any[] | undefined;
  articles: any[] | undefined;
}

export const AuthorsTab = ({ authors, articles }: AuthorsTabProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Authors</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Author
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors?.map((author) => (
          <Card key={author.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {author.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <CardTitle className="text-lg">{author.name}</CardTitle>
                  <CardDescription>{author.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{author.bio}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {articles?.filter(a => a.author_id === author.id).length || 0} articles
                </span>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
