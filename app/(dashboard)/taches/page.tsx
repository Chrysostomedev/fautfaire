"use client";

import React, { useState } from "react";
import { Plus, ListFilter, Search } from "lucide-react";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { TaskCard } from "@/components/cards/TaskCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AddTaskModal } from "@/components/modals/AddTaskModal";
import { useToast } from "@/components/ui/Toast";
import { Task } from "@/types/task.types";
import initialTasks from "@/data/mock/tasks.mock.json";

export default function TasksPage() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);
  const [filter, setFilter] = useState<"toutes" | "a_faire" | "en_cours" | "terminee">("toutes");
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Toggle task completion
  const handleToggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus = t.statut === "terminee" ? "a_faire" : "terminee";
          if (newStatus === "terminee") {
            showToast("Tâche validée ! Excellent travail 🔥");
          }
          return { ...t, statut: newStatus };
        }
        return t;
      })
    );
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("Tâche supprimée avec succès.", "info");
  };

  // Save or Update task
  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      // Update
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
      showToast("Tâche mise à jour !");
      setEditingTask(null);
    } else {
      // Create new
      const newTask: Task = {
        ...taskData,
        id: `t_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast("Tâche créée !");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Filtering & searching
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.titre.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    
    if (filter === "toutes") return matchesSearch;
    return task.statut === filter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top action block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-text">Mes Tâches</h2>
          <p className="text-xs font-semibold text-textMuted mt-0.5">
            Organise ton travail et suis tes progrès journaliers.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-5 h-5" />}
        >
          Nouvelle tâche
        </Button>
      </div>

      {/* Filter and Search bars */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Rechercher une tâche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="h-11"
          />
        </div>

        {/* Tab Filters (sliding style) */}
        <div className="flex p-1 rounded-xl bg-surfaceLight border border-border/80 self-start md:self-auto overflow-x-auto no-scrollbar">
          {(["toutes", "a_faire", "en_cours", "terminee"] as const).map((opt) => {
            const labels = {
              toutes: "Toutes",
              a_faire: "À faire",
              en_cours: "En cours",
              terminee: "Terminées",
            };

            return (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                  filter === opt ? "bg-primary text-text shadow-sm" : "text-textMuted hover:text-text"
                }`}
              >
                {labels[opt]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Listing */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length === 0 ? (
          <EmptyState
            iconName="CheckSquare"
            title="Aucune tâche trouvée"
            description="Profites-en pour planifier de nouvelles choses à faire aujourd'hui !"
            actionLabel="Créer une tâche"
            onAction={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          />
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      {/* Add / Edit Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
}
