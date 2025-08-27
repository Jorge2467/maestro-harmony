
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

const myTasksData: Task[] = [
  { id: 1, title: "Preparar material para aula de violino", description: "Selecionar partituras para nível intermediário", dueDate: "Hoje", completed: true },
  { id: 2, title: "Avaliar progresso dos alunos de piano", description: "Revisar relatórios de desempenho", dueDate: "Amanhã", completed: false },
  { id: 3, title: "Agendar ensaio para concerto de final de ano", description: "Coordenar com todos os professores", dueDate: "Em 2 dias", completed: false },
  { id: 4, title: "Revisar currículo do curso de guitarra", description: "Atualizar para o próximo semestre", dueDate: "Em 5 dias", completed: false },
];

const teamTasksData: Task[] = [
  { id: 5, title: "Preparar sala para workshop", description: "Equipe de logística", dueDate: "Em 3 dias", completed: false },
  { id: 6, title: "Atualizar site com novos horários", description: "Equipe de TI", dueDate: "Concluído", completed: true },
];

function TaskItem({ task, onToggle }: { task: Task, onToggle: (id: number) => void }) {
  return (
    <div className="flex items-start gap-4 p-4 border-b last:border-b-0">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-1"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "text-sm font-medium cursor-pointer",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </label>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <div className="ml-auto text-sm text-muted-foreground">{task.dueDate}</div>
    </div>
  );
}

export default function TasksPage() {
  const [myTasks, setMyTasks] = useState(myTasksData);
  const [teamTasks, setTeamTasks] = useState(teamTasksData);

  const toggleTask = (id: number, type: 'my' | 'team') => {
    const taskList = type === 'my' ? myTasks : teamTasks;
    const setTaskList = type === 'my' ? setMyTasks : setTeamTasks;

    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <PageHeader title="Gestão de Tarefas">
        <Button><Plus className="mr-2" /> Nova Tarefa</Button>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Tarefas</CardTitle>
            <CardDescription>Suas tarefas e pendências individuais.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {myTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={(id) => toggleTask(id, 'my')} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tarefas da Equipe</CardTitle>
            <CardDescription>Tarefas atribuídas a diferentes equipes.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             {teamTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={(id) => toggleTask(id, 'team')} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
