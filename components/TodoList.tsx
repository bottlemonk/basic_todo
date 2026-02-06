"use client";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Todo, Priority } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdatePriority: (id: string, priority: Priority) => void;
    onReorder: (activeId: string, overId: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onUpdatePriority, onReorder }: TodoListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            onReorder(active.id as string, over?.id as string);
        }
    };

    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                No tasks yet. Add one above!
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={todos}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdatePriority={onUpdatePriority}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
