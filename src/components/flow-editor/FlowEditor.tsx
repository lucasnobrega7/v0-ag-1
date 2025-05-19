"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import ReactFlow, { Background, Controls, MiniMap, Panel, type Connection, type NodeTypes } from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Undo, Redo, Play, Plus } from "lucide-react"
import { useFlow } from "@/contexts/FlowContext"
import { IntentNode } from "./nodes/IntentNode"
import { MessageNode } from "./nodes/MessageNode"
import { ActionNode } from "./nodes/ActionNode"
import { ConditionNode } from "./nodes/ConditionNode"
import { NodePanel } from "./NodePanel"
import { NodeEditor } from "./NodeEditor"
import type { INode, IEdge } from "@/lib/interfaces/flow"

// Define os tipos de nós disponíveis
const nodeTypes: NodeTypes = {
  intentNode: IntentNode,
  messageNode: MessageNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
}

interface FlowEditorProps {
  flowId: string
}

export function FlowEditor({ flowId }: FlowEditorProps) {
  const {
    flow,
    nodes,
    edges,
    setNodes,
    setEdges,
    loadFlow,
    saveFlow,
    updateFlowName,
    updateFlowDescription,
    validateFlow,
    undo,
    redo,
    canUndo,
    canRedo,
    loading,
    saving,
  } = useFlow()

  const [selectedNode, setSelectedNode] = useState<INode | null>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  // Carregar o fluxo quando o componente for montado
  useEffect(() => {
    loadFlow(flowId)
  }, [flowId, loadFlow])

  // Manipuladores de eventos do ReactFlow
  const onNodesChange = useCallback(
    (changes) => {
      setNodes(
        nodes.map((node) => {
          const change = changes.find((c) => c.id === node.id)
          if (change && change.type === "position" && change.position) {
            return { ...node, position: change.position }
          }
          return node
        }),
      )
    },
    [nodes, setNodes],
  )

  const onEdgesChange = useCallback(
    (changes) => {
      // Implementar lógica para atualizar as arestas com base nas mudanças
      // Isso é mais complexo e depende do tipo de mudanças que você quer permitir
    },
    [setEdges],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      // Criar uma nova aresta quando os nós são conectados
      const newEdge: IEdge = {
        id: `e-${connection.source}-${connection.target}`,
        source: connection.source || "",
        target: connection.target || "",
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      }
      setEdges([...edges, newEdge])
    },
    [edges, setEdges],
  )

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node)
    },
    [setSelectedNode],
  )

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [setSelectedNode])

  // Função para adicionar um novo nó
  const addNode = useCallback(
    (type: string) => {
      const newNode: INode = {
        id: `node-${Date.now()}`,
        type: `${type}Node`,
        position: { x: 100, y: 100 },
        data: {
          label: `Novo ${type}`,
          // Dados específicos para cada tipo de nó
          ...(type === "intent" && { patterns: [] }),
          ...(type === "message" && { content: "" }),
          ...(type === "action" && { actionType: "api", config: {} }),
          ...(type === "condition" && { condition: "", branches: [] }),
        },
      }
      setNodes([...nodes, newNode])
      setSelectedNode(newNode)
    },
    [nodes, setNodes],
  )

  // Função para executar o fluxo (simulação)
  const runFlow = useCallback(() => {
    const validationResult = validateFlow()
    if (!validationResult.valid) {
      alert(`Fluxo inválido: ${validationResult.errors.join("\n")}`)
      return
    }
    alert("Simulação de fluxo iniciada!")
    // Implementar lógica de simulação do fluxo
  }, [validateFlow])

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex-1">
          <Input
            value={flow?.name || ""}
            onChange={(e) => updateFlowName(e.target.value)}
            placeholder="Nome do fluxo"
            className="text-xl font-bold mb-1"
          />
          <Input
            value={flow?.description || ""}
            onChange={(e) => updateFlowDescription(e.target.value)}
            placeholder="Descrição do fluxo"
            className="text-sm text-gray-500"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={undo} disabled={!canUndo}>
            <Undo className="h-4 w-4 mr-1" />
            Desfazer
          </Button>
          <Button variant="outline" onClick={redo} disabled={!canRedo}>
            <Redo className="h-4 w-4 mr-1" />
            Refazer
          </Button>
          <Button variant="outline" onClick={runFlow}>
            <Play className="h-4 w-4 mr-1" />
            Testar
          </Button>
          <Button onClick={saveFlow} disabled={saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 border-r p-4 bg-gray-50">
          <Tabs defaultValue="nodes">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="nodes" className="flex-1">
                Nós
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                Configurações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nodes">
              <NodePanel onAddNode={addNode} />
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Fluxo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="flowName">Nome</Label>
                      <Input id="flowName" value={flow?.name || ""} onChange={(e) => updateFlowName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="flowDescription">Descrição</Label>
                      <Input
                        id="flowDescription"
                        value={flow?.description || ""}
                        onChange={(e) => updateFlowDescription(e.target.value)}
                      />
                    </div>
                    {/* Outras configurações do fluxo */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 h-full" ref={reactFlowWrapper}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
              <Panel position="top-right">
                <Button variant="outline" onClick={() => addNode("intent")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Intent
                </Button>
              </Panel>
            </ReactFlow>
          )}
        </div>

        {selectedNode && (
          <div className="w-80 border-l p-4 bg-gray-50">
            <NodeEditor node={selectedNode} />
          </div>
        )}
      </div>
    </div>
  )
}
