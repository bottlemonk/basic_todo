"use client";

import { useState, useCallback, useEffect } from 'react';
import { Todo, Priority } from '@/types/todo';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('priority-todos');
        if (saved) {
            try {
                setTodos(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse todos', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('priority-todos', JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = useCallback((text: string, priority: Priority) => {
        // Simple fallback for unique ID generation if crypto.randomUUID is not available
        const generateId = () => {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        };

        const newTodo: Todo = {
            id: generateId(),
            text,
            priority,
            completed: false,
        };
        setTodos((prev) => [newTodo, ...prev]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    const updatePriority = useCallback((id: string, priority: Priority) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, priority } : todo
            )
        );
    }, []);

    const reorderTodos = useCallback((activeId: string, overId: string) => {
        setTodos((prev) => {
            const oldIndex = prev.findIndex((t) => t.id === activeId);
            const newIndex = prev.findIndex((t) => t.id === overId);

            if (oldIndex === -1 || newIndex === -1) return prev;

            const newTodos = [...prev];
            const [movedItem] = newTodos.splice(oldIndex, 1);
            newTodos.splice(newIndex, 0, movedItem);
            return newTodos;
        });
    }, []);

    return {
        todos,
        isLoaded,
        addTodo,
        toggleTodo,
        deleteTodo,
        updatePriority,
        reorderTodos,
    };
}
