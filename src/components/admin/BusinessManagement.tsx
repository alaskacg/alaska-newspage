import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Building2, Loader2 } from "lucide-react";

interface Business {
  id: string;
  name: string;
  category: string;
  description: string | null;
  city: string | null;
  address: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  website_url: string | null;
  region_id: string | null;
}

interface Region {
  id: string;
  name: string;
}

const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    city: "",
    address: "",
    contact_phone: "",
    contact_email: "",
    website_url: "",
    region_id: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [businessesRes, regionsRes] = await Promise.all([
        supabase.from("local_businesses").select("*").order("name"),
        supabase.from("regions").select("id, name").order("name"),
      ]);
      if (businessesRes.error) throw businessesRes.error;
      if (regionsRes.error) throw regionsRes.error;
      setBusinesses(businessesRes.data || []);
      setRegions(regionsRes.data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", category: "", description: "", city: "", address: "",
      contact_phone: "", contact_email: "", website_url: "", region_id: "",
    });
    setEditingBusiness(null);
  };

  const handleEdit = (business: Business) => {
    setEditingBusiness(business);
    setFormData({
      name: business.name,
      category: business.category,
      description: business.description || "",
      city: business.city || "",
      address: business.address || "",
      contact_phone: business.contact_phone || "",
      contact_email: business.contact_email || "",
      website_url: business.website_url || "",
      region_id: business.region_id || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description || null,
      city: formData.city || null,
      address: formData.address || null,
      contact_phone: formData.contact_phone || null,
      contact_email: formData.contact_email || null,
      website_url: formData.website_url || null,
      region_id: formData.region_id || null,
    };

    try {
      if (editingBusiness) {
        const { error } = await supabase.from("local_businesses").update(payload).eq("id", editingBusiness.id);
        if (error) throw error;
        toast({ title: "Success", description: "Business updated successfully" });
      } else {
        const { error } = await supabase.from("local_businesses").insert(payload);
        if (error) throw error;
        toast({ title: "Success", description: "Business created successfully" });
      }
      resetForm();
      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this business?")) return;
    try {
      const { error } = await supabase.from("local_businesses").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Business deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const categories = ["Restaurant", "Retail", "Service", "Tourism", "Healthcare", "Professional", "Other"];

  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-orange-400" />
            Business Directory
          </CardTitle>
          <CardDescription className="text-white/60">Manage local businesses</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">{editingBusiness ? "Edit Business" : "Add Business"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Name *</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-700 border-white/10 text-white" required />
                </div>
                <div>
                  <Label className="text-white">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-slate-700 border-white/10 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-white">Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-slate-700 border-white/10 text-white" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">City</Label>
                  <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="bg-slate-700 border-white/10 text-white" />
                </div>
                <div>
                  <Label className="text-white">Region</Label>
                  <Select value={formData.region_id} onValueChange={(value) => setFormData({ ...formData, region_id: value })}>
                    <SelectTrigger className="bg-slate-700 border-white/10 text-white">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-white">Address</Label>
                <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-slate-700 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Phone</Label>
                  <Input value={formData.contact_phone} onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })} className="bg-slate-700 border-white/10 text-white" />
                </div>
                <div>
                  <Label className="text-white">Email</Label>
                  <Input type="email" value={formData.contact_email} onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })} className="bg-slate-700 border-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-white">Website</Label>
                <Input type="url" value={formData.website_url} onChange={(e) => setFormData({ ...formData, website_url: e.target.value })} className="bg-slate-700 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingBusiness ? "Update" : "Create"} Business
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-white/60" /></div>
        ) : businesses.length === 0 ? (
          <p className="text-center text-white/60 py-8">No businesses found</p>
        ) : (
          <div className="space-y-3">
            {businesses.map((business) => (
              <div key={business.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">{business.name}</h3>
                  <p className="text-sm text-white/60">{business.category} • {business.city || "No city"}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(business)} className="text-white/70 hover:text-white">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(business.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessManagement;
