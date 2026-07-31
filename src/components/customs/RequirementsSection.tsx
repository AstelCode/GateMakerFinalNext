import { useState } from "react";
import { Plus, X, Lock, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Requirement = {
  id: number;
  label: string;
  value: string;
  isMandatory?: boolean;
};

interface RequirementsSectionProps {
  requirements: Requirement[];
  onRemove: (id: number) => void;
  onAdd: (requirement: { label: string; value: string }) => void;
  onUpdate: (id: number, newValue: string) => void; // NUEVO: Para actualizar un valor
}

type ParamConfig = {
  label: string;
  type: "select" | "text";
  options?: string[];
  placeholder?: string;
};

const REQUIREMENT_CONFIG: Record<string, ParamConfig> = {
  "Game Version": {
    label: "Game Version",
    type: "select",
    options: ["1.18.2", "1.19.2", "1.19.4", "1.20.1", "1.20.4", "1.21"],
  },
  "Mod Loader": {
    label: "Mod Loader",
    type: "select",
    options: ["Forge", "Fabric", "Quilt", "NeoForge"],
  },
  RAM: {
    label: "RAM",
    type: "select",
    options: ["2 GB minimum", "4 GB minimum", "8 GB minimum", "16 GB minimum"],
  },
  "Disk Space": {
    label: "Disk Space",
    type: "text",
    placeholder: "e.g., 500 MB, 2 GB",
  },
  OS: {
    label: "OS",
    type: "select",
    options: ["Windows", "macOS", "Linux", "Any"],
  },
  Custom: {
    label: "Custom Requirement",
    type: "text",
    placeholder: "Describe the requirement...",
  },
};

export function RequirementsSection({
  requirements,
  onRemove,
  onAdd,
  onUpdate,
}: RequirementsSectionProps) {
  const [selectedParamKey, setSelectedParamKey] = useState<string>("");
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const activeConfig = selectedParamKey
    ? REQUIREMENT_CONFIG[selectedParamKey]
    : null;

  const handleParamChange = (key: string | null) => {
    if (!key) return;
    setSelectedParamKey(key);
    setNewValue("");
  };

  const handleEditClick = (req: Requirement) => {
    // Buscamos la clave correspondiente en la configuración base
    const key =
      Object.keys(REQUIREMENT_CONFIG).find(
        (k) => REQUIREMENT_CONFIG[k].label === req.label,
      ) || "Custom";

    setSelectedParamKey(key);
    setNewValue(req.value);
    setEditingId(req.id); // Marcamos el ID que estamos editando
  };

  const cancelEdit = () => {
    setSelectedParamKey("");
    setNewValue("");
    setEditingId(null);
  };

  const handleSaveClick = () => {
    if (!activeConfig || !newValue.trim()) return;

    if (editingId) {
      // Si estamos editando, actualizamos
      onUpdate(editingId, newValue.trim());
    } else {
      // Si es nuevo, añadimos
      onAdd({ label: activeConfig.label, value: newValue.trim() });
    }

    cancelEdit();
  };

  return (
    <Card className="bg-muted/20 border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Requirements</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6 space-y-8">
        {/* Lista de Requisitos Actuales */}
        {requirements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requirements.map((req) => (
              <div
                key={req.id}
                className={`flex items-center justify-between border rounded-lg p-3 ${
                  req.isMandatory && (req.value == "" || !req.value)
                    ? "bg-destructive/5 border-destructive/20"
                    : req.isMandatory
                      ? "bg-primary/5 border-primary/20"
                      : "bg-background border-border/50"
                }`}
              >
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {req.label}
                    </span>
                    {req.isMandatory && req.value != "" && (
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0 rounded uppercase font-semibold flex items-center gap-1">
                        <Lock className="size-2.5" /> Required
                      </span>
                    )}
                    {req.isMandatory && req.value == "" && (
                      <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0 rounded uppercase font-semibold flex items-center gap-1">
                        <Lock className="size-2.5" /> Required
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium truncate">
                    {req.value}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Botón Editar siempre visible */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => handleEditClick(req)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  {/* Botón Eliminar (solo si no es obligatorio) */}
                  {!req.isMandatory && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemove(req.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No requirements added yet.
          </p>
        )}

        {/* Formulario en línea para agregar/editar requisitos */}
        <div className="bg-background border rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-medium">
            {editingId ? "Update Requirement" : "Add Requirement"}
          </h4>

          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="grid gap-2 flex-1 w-full">
              <Label htmlFor="req-label">Parameter</Label>
              <Select
                value={selectedParamKey}
                onValueChange={handleParamChange}
                disabled={!!editingId} // No se cambia el parámetro mientras editas
              >
                <SelectTrigger id="req-label">
                  <SelectValue placeholder="Select a parameter..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(REQUIREMENT_CONFIG).map((key) => {
                    // Verificamos si este parámetro ya está listado
                    const isExisting = requirements.some(
                      (req) => req.label === REQUIREMENT_CONFIG[key].label,
                    );

                    // OCULTAR en el Select si ya existe, a menos que lo estés editando
                    // en ese preciso momento, o si es un campo "Custom" (que puede repetirse)
                    if (
                      isExisting &&
                      key !== selectedParamKey &&
                      key !== "Custom"
                    ) {
                      return null;
                    }

                    return (
                      <SelectItem key={key} value={key}>
                        {REQUIREMENT_CONFIG[key].label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 flex-1 w-full">
              <Label htmlFor="req-value">Value</Label>
              {!activeConfig && (
                <Input disabled placeholder="Select a parameter first..." />
              )}
              {activeConfig?.type === "text" && (
                <Input
                  id="req-value"
                  placeholder={activeConfig.placeholder}
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSaveClick();
                    }
                  }}
                />
              )}
              {activeConfig?.type === "select" && (
                <Select
                  value={newValue}
                  onValueChange={(val) => setNewValue(val ?? "")}
                >
                  <SelectTrigger id="req-value">
                    <SelectValue placeholder="Select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activeConfig.options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {editingId && (
                <Button
                  onClick={cancelEdit}
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSaveClick}
                type="button"
                disabled={!selectedParamKey || !newValue.trim()}
                className="flex-1 sm:flex-none"
              >
                {editingId ? (
                  "Update"
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
