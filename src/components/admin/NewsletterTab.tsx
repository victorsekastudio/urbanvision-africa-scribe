
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { 
  useNewsletterSubscribers, 
  useUpdateSubscriberStatus, 
  useDeleteSubscriber,
  type NewsletterSubscriber 
} from "@/hooks/useNewsletterSubscribers";
import { Trash2, Download } from "lucide-react";

interface NewsletterTabProps {
  subscribers?: NewsletterSubscriber[];
}

export const NewsletterTab = ({ subscribers }: NewsletterTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: subscribersData, isLoading } = useNewsletterSubscribers();
  const updateStatus = useUpdateSubscriberStatus();
  const deleteSubscriber = useDeleteSubscriber();
  const { toast } = useToast();

  const allSubscribers = subscribers || subscribersData || [];
  
  const filteredSubscribers = allSubscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = async (subscriber: NewsletterSubscriber) => {
    const newStatus = subscriber.status === 'active' ? 'unsubscribed' : 'active';
    
    try {
      await updateStatus.mutateAsync({ id: subscriber.id, status: newStatus });
      toast({
        title: "Success",
        description: `Subscriber ${newStatus === 'active' ? 'reactivated' : 'unsubscribed'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscriber status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      await deleteSubscriber.mutateAsync(id);
      toast({
        title: "Success",
        description: "Subscriber deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscriber",
        variant: "destructive",
      });
    }
  };

  const exportSubscribers = () => {
    const activeSubscribers = allSubscribers.filter(sub => sub.status === 'active');
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Subscribed At,Status\n"
      + activeSubscribers.map(sub => 
          `${sub.email},${new Date(sub.subscribed_at).toLocaleDateString()},${sub.status}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeCount = allSubscribers.filter(sub => sub.status === 'active').length;
  const unsubscribedCount = allSubscribers.filter(sub => sub.status === 'unsubscribed').length;

  if (isLoading) {
    return <div className="p-6">Loading subscribers...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h2>
          <p className="text-gray-600 mt-1">
            {activeCount} active, {unsubscribedCount} unsubscribed
          </p>
        </div>
        <Button onClick={exportSubscribers} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={subscriber.status === 'active' ? 'default' : 'secondary'}
                  >
                    {subscriber.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(subscriber.subscribed_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusToggle(subscriber)}
                    >
                      {subscriber.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(subscriber.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredSubscribers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No subscribers found matching your search.' : 'No subscribers yet.'}
        </div>
      )}
    </div>
  );
};
