import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, MapPin, Loader2 } from "lucide-react";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coordinates: any;
}

const RegionManagement = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const { data, error } = await supabase
        .from("regions")
        .select("*")
        .order("name");
      if (error) throw error;
      setRegions(data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "" });
    setEditingRegion(null);
  };

  const handleEdit = (region: Region) => {
    setEditingRegion(region);
    setFormData({
      name: region.name,
      slug: region.slug,
      description: region.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingRegion) {
        const { error } = await supabase
          .from("regions")
          .update({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null,
          })
          .eq("id", editingRegion.id);
        if (error) throw error;
        toast({ title: "Success", description: "Region updated successfully" });
      } else {
        const { error } = await supabase
          .from("regions")
          .insert({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null,
          });
        if (error) throw error;
        toast({ title: "Success", description: "Region created successfully" });
      }
      resetForm();
      setIsDialogOpen(false);
      fetchRegions();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this region?")) return;

    try {
      const { error } = await supabase.from("regions").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Region deleted successfully" });
      fetchRegions();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Region Management
          </CardTitle>
          <CardDescription className="text-white/60">Manage Alaska regions</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" /> Add Region
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">{editingRegion ? "Edit Region" : "Add Region"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white">Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) });
                  }}
                  className="bg-slate-700 border-white/10 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-slate-700 border-white/10 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-white/10 text-white"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingRegion ? "Update" : "Create"} Region
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white/60" />
          </div>
        ) : regions.length === 0 ? (
          <p className="text-center text-white/60 py-8">No regions found</p>
        ) : (
          <div className="space-y-3">
            {regions.map((region) => (
              <div key={region.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">{region.name}</h3>
                  <p className="text-sm text-white/60">/{region.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(region)} className="text-white/70 hover:text-white">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(region.id)} className="text-red-400 hover:text-red-300">
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

export default RegionManagement;
