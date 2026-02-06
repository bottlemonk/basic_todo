"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, GripVertical } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Todo, Priority } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdatePriority: (id: string, priority: Priority) => void;
}

const priorityColors: Record<Priority, string> = {
    P1: 'bg-red-100 border-red-200',
    P2: 'bg-yellow-100 border-yellow-200',
    P3: 'bg-green-100 border-green-200',
};

export function TodoItem({ todo, onToggle, onDelete, onUpdatePriority }: TodoItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 'auto',
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                'flex items-center gap-3 p-3 rounded-lg border transition-colors',
                priorityColors[todo.priority],
                todo.completed && 'opacity-50 grayscale'
            )}
        >
            <div {...attributes} {...listeners} className="cursor-grab hover:text-black/60 text-black/30 touch-none">
                <GripVertical className="h-5 w-5" />
            </div>

            <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
            />

            <span className={cn('flex-1 truncate select-none', todo.completed && 'line-through')}>
                {todo.text}
            </span>

            <Select
                value={todo.priority}
                onValueChange={(value) => onUpdatePriority(todo.id, value as Priority)}
            >
                <SelectTrigger className="w-[80px] h-8 bg-white/50 border-0 focus:ring-1">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="P1">P1</SelectItem>
                    <SelectItem value="P2">P2</SelectItem>
                    <SelectItem value="P3">P3</SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="h-8 w-8 text-black/50 hover:text-black hover:bg-black/10"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
