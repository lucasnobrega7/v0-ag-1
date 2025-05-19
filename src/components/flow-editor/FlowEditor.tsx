"use client"

import type React from "react"

import { useRef, useCallback, useEffect, useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  type Edge,
} from "reactflow"
import "reactflow/dist/style.css"
import { useFlow } from "@/contexts/FlowContext"
import { Button } from "@/components/ui/button"
import {
  Save,
  Plus,
  Play,
  Download,
  Upload,
  Undo2,
  Redo2,
  Check,
  AlertTriangle,
  FileText,
  Settings,
} from "lucide-react"
import { NodePanel } from "./NodePanel"
import { NodeEditor } from "./NodeEditor"
import { IntentNode } from "./nodes/IntentNode"
import { MessageNode } from "./nodes/MessageNode"
import { ActionNode } from "./nodes/ActionNode"
import { ConditionNode } from "./nodes/ConditionNode"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FlowTemplates } from "./FlowTemplates"
import { FlowSimulator } from "./FlowSimulator"

// Register custom node types
const nodeTypes = {
  intentNode: IntentNode,
  messageNode: MessageNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
}

export function FlowEditor() {
  const {
    flow,
    nodes,
    edges,
    setNodes,
    setEdges,
    saveFlow,
    saving,
    addNode,
    updateNode,
    removeNode,
    addEdge: addFlowEdge,
    removeEdge,
    updateFlowName,
    updateFlowDescription,
    validateFlow,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useFlow()

  const [reactflowNodes, setReactflowNodes, onNodesChange] = useNodesState([])
  const [reactflowEdges, setReactflowEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showNodePanel, setShowNodePanel] = useState(false)
  const [showNodeEditor, setShowNodeEditor] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showSimulator, setShowSimulator] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [validationResults, setValidationResults] = useState<{ valid: boolean; errors: string[] }>({
    valid: true,
    errors: [],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Sync nodes and edges with context
  useEffect(() => {
    setReactflowNodes(nodes)
  }, [nodes])

  useEffect(() => {
    setReactflowEdges(edges)
  }, [edges])

  // Update context when nodes or edges change
  useEffect(() => {
    setNodes(reactflowNodes)
  }, [reactflowNodes, setNodes])

  useEffect(() => {
    setEdges(reactflowEdges)
  }, [reactflowEdges, setEdges])

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge = {
        ...connection,
        id: `edge_${Date.now()}`,
        animated: true,
        style: { stroke: "#FF5722", strokeWidth: 2 },
      } as Edge
      setReactflowEdges((eds) => addEdge(newEdge, eds))
      addFlowEdge(newEdge)
    },
    [setReactflowEdges, addFlowEdge],
  )

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setShowNodeEditor(true)
  }, [])

  const handleSave = async () => {
    // Validar o fluxo antes de salvar
    const validation = validateFlow()
    if (!validation.valid) {
      setValidationResults(validation)
      setShowValidation(true)
      return
    }

    await saveFlow()
  }

  const handleAddNode = (nodeType: string, data: any) => {
    const newNode = {
      id: `${nodeType}_${Date.now()}`,
      type: nodeType,
      position: { x: 100, y: 100 },
      data,
    }
    addNode(newNode)
    setShowNodePanel(false)
  }

  const handleUpdateNode = (nodeId: string, data: any) => {
    updateNode(nodeId, data)
    setShowNodeEditor(false)
    setSelectedNode(null)
  }

  const handleDeleteNode = (nodeId: string) => {
    removeNode(nodeId)
    setShowNodeEditor(false)
    setSelectedNode(null)
  }

  // Export flow as JSON
  const handleExport = () => {
    if (!flow) return

    const flowData = {
      id: flow.id,
      name: flow.name,
      description: flow.description,
      nodes,
      edges,
    }

    const dataStr = JSON.stringify(flowData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `flow-${flow.id}-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // Import flow from JSON
  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const result = e.target?.result
        if (typeof result === "string") {
          const flowData = JSON.parse(result)

          if (flowData.nodes && flowData.edges) {
            setNodes(flowData.nodes)
            setEdges(flowData.edges)

            // Atualizar nome e descrição se disponíveis
            if (flowData.name) updateFlowName(flowData.name)
            if (flowData.description) updateFlowDescription(flowData.description)

            toast({
              title: "Fluxo importado com sucesso",
              description: "O fluxo foi importado com sucesso.",
            })
          } else {
            throw new Error("Invalid flow data format")
          }
        }
      } catch (error) {
        console.error("Error importing flow:", error)
        toast({
          title: "Erro ao importar",
          description: "O arquivo selecionado não é um fluxo válido.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)

    // Reset the file input
    event.target.value = ""
  }

  return (
    <>
      <div className="h-[calc(100vh-4rem)] w-full">
        <ReactFlow
          nodes={reactflowNodes}
          edges={reactflowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "intentNode") return "#0EA5E9"
              if (n.type === "messageNode") return "#10B981"
              if (n.type === "actionNode") return "#8B5CF6"
              if (n.type === "conditionNode") return "#F59E0B"
              return "#71717A"
            }}
            nodeColor={(n) => {
              if (n.type === "intentNode") return "#0EA5E9"
              if (n.type === "messageNode") return "#10B981"
              if (n.type === "actionNode") return "#8B5CF6"
              if (n.type === "conditionNode") return "#F59E0B"
              return "#71717A"
            }}
          />
          <Panel position="top-right" className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowNodePanel(true)}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Nó
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
              <FileText className="mr-2 h-4 w-4" /> Templates
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="mr-2 h-4 w-4" /> Configurações
            </Button>
            <Button variant="default" size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" /> {saving ? "Salvando..." : "Salvar Fluxo"}
            </Button>
          </Panel>

          <Panel position="bottom-right" className="flex gap-2">
            <Button variant="outline" size="sm" onClick={undo} disabled={!canUndo}>
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={redo} disabled={!canRedo}>
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSimulator(true)}>
              <Play className="mr-2 h-4 w-4" /> Simular
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" /> Importar
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".json" className="hidden" />
          </Panel>
        </ReactFlow>

        {showNodePanel && <NodePanel onClose={() => setShowNodePanel(false)} onAddNode={handleAddNode} />}

        {showNodeEditor && selectedNode && (
          <NodeEditor
            node={selectedNode}
            onClose={() => {
              setShowNodeEditor(false)
              setSelectedNode(null)
            }}
            onUpdate={handleUpdateNode}
            onDelete={handleDeleteNode}
          />
        )}
      </div>

      {/* Diálogo de configurações do fluxo */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configurações do Fluxo</DialogTitle>
            <DialogDescription>Edite as configurações básicas do seu fluxo.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={flow?.name || ""}
                onChange={(e) => updateFlowName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={flow?.description || ""}
                onChange={(e) => updateFlowDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setShowSettings(false)}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de validação do fluxo */}
      <Dialog open={showValidation} onOpenChange={setShowValidation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {validationResults.valid ? (
                <Check className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              )}
              Validação do Fluxo
            </DialogTitle>
            <DialogDescription>
              {validationResults.valid
                ? "Seu fluxo está válido e pronto para ser salvo."
                : "Foram encontrados problemas no seu fluxo que precisam ser corrigidos."}
            </DialogDescription>
          </DialogHeader>
          {!validationResults.valid && (
            <div className="py-4">
              <h4 className="mb-2 font-medium">Problemas encontrados:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {validationResults.errors.map((error, index) => (
                  <li key={index} className="text-sm text-amber-600 dark:text-amber-400">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowValidation(false)}>
              Fechar
            </Button>
            {!validationResults.valid && (
              <Button
                variant="default"
                onClick={() => {
                  setShowValidation(false)
                  saveFlow() // Salvar mesmo com erros
                }}
              >
                Salvar mesmo assim
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Componente de templates */}
      {showTemplates && (
        <FlowTemplates
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={(template) => {
            setNodes(template.nodes)
            setEdges(template.edges)
            setShowTemplates(false)
          }}
        />
      )}

      {/* Componente de simulação */}
      {showSimulator && <FlowSimulator flow={{ nodes, edges }} onClose={() => setShowSimulator(false)} />}
    </>
  )
}
