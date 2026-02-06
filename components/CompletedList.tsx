"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Todo, Priority } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface CompletedListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdatePriority: (id: string, priority: Priority) => void;
}

export function CompletedList({ todos, onToggle, onDelete, onUpdatePriority }: CompletedListProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (todos.length === 0) return null;

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
        >
            <div className="flex items-center justify-between">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-start p-0 hover:bg-transparent">
                        {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                        <span className="font-medium text-gray-500">
                            Completed Tasks ({todos.length})
                        </span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 pt-2">
                {todos.map((todo) => (
                    <div key={todo.id} className="opacity-70">
                        {/* We strictly reuse TodoItem but maybe disable drag? TodoItem has useSortable hooks always. 
                 It might warn if not in SortableContext. 
                 Workaround: Wrap this in a DndContext that does nothing? 
                 Or make TodoItem Sortable optional? 
                 Let's make TodoItem Drag handle conditional. */}
                        <TodoItem
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdatePriority={onUpdatePriority}
                        />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}
