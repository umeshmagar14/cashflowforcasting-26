import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Entity } from "@/types/accountTypes";

interface EntityFilterProps {
  selectedEntityId: string;
  onEntityChange: (entityId: string) => void;
  rootEntity: Entity;
}

const flattenEntityHierarchy = (entity: Entity): Entity[] => {
  const entities = [entity];
  if (entity.subEntities) {
    entity.subEntities.forEach(subEntity => {
      entities.push(...flattenEntityHierarchy(subEntity));
    });
  }
  return entities;
};

export const EntityFilter = ({ selectedEntityId, onEntityChange, rootEntity }: EntityFilterProps) => {
  const entities = flattenEntityHierarchy(rootEntity);

  return (
    <div className="w-[250px]">
      <Select value={selectedEntityId} onValueChange={onEntityChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select entity to view" />
        </SelectTrigger>
        <SelectContent>
          {entities.map((entity) => (
            <SelectItem key={entity.id} value={entity.id}>
              {entity.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};