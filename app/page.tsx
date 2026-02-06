"use client";

import { useTodos } from '@/hooks/useTodos';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { CompletedList } from '@/components/CompletedList';

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updatePriority, reorderTodos } = useTodos();

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Priority Todo</h1>
          <p className="text-gray-500 mt-2">Manage your tasks by importance</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <TodoInput onAdd={addTodo} />

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                Active Tasks
              </h2>
              <TodoList
                todos={activeTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdatePriority={updatePriority}
                onReorder={reorderTodos}
              />
            </div>

            <CompletedList
              todos={completedTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdatePriority={updatePriority}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
