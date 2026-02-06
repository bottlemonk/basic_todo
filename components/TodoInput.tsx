"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Priority } from '@/types/todo';

interface TodoInputProps {
    onAdd: (text: string, priority: Priority) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('P2');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) {
            setIsError(true);
            setTimeout(() => setIsError(false), 500); // Reset after animation
            return;
        }
        onAdd(text, priority);
        setText('');
        setPriority('P2');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
                type="text"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`flex-1 transition-all ${isError ? 'border-red-500 ring-2 ring-red-100 animate-in slide-in-from-left-1 duration-75 repeat-[2]' : ''}`}
            // Note: Tailwind doesn't have a built-in 'shake' keyframe by default without config. 
            // We will mock a shake with existing utilities or just red border for MVP high-compat.
            // Actually, let's just use the red border for now to avoid config complexity, 
            // or add a style tag if we really want shake.
            />
            <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="P1">P1</SelectItem>
                    <SelectItem value="P2">P2</SelectItem>
                    <SelectItem value="P3">P3</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
            </Button>
        </form>
    );
}
