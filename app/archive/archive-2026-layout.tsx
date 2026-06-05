"use client";

import { ReactNode, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  Panel as FlowPanel,
} from "reactflow";
import "reactflow/dist/style.css";

interface FlowCoordinate {
  x: number; // Absolute X position in pixels
  y: number; // Absolute Y position in pixels
}

interface ContentBlock {
  id: string;
  content: ReactNode;
  size?: "small" | "medium" | "large";
  position: FlowCoordinate; // Absolute position in the world
}

interface Section {
  id: string;
  title?: string;
  blocks: ContentBlock[];
  entryPoint: FlowCoordinate; // Where the path enters this section
  exitPoint: FlowCoordinate; // Where the path exits to the next section
  backgroundColor?: string;
  bounds: { x: number; y: number; width: number; height: number }; // Section boundaries
}

interface ArchiveLayoutProps {
  children?: ReactNode;
  sections?: Section[];
}

// Custom node component for content blocks
const ContentNode = ({ data }: { data: { content: ReactNode; size: string } }) => {
  return (
    <div
      className={`
        rounded-xl overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm
        border-2 border-blue-200
        transition-all duration-300 hover:scale-105 hover:shadow-2xl
        ${data.size === "large" ? "min-w-[400px]" : ""}
        ${data.size === "medium" ? "min-w-[300px]" : ""}
        ${data.size === "small" ? "min-w-[200px]" : ""}
      `}
    >
      <div className="p-6">
        {data.content}
      </div>
    </div>
  );
};

// Custom node for section titles
const SectionTitleNode = ({ data }: { data: { title: string } }) => {
  return (
    <div className="text-5xl font-bold text-gray-800 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border-4 border-gray-800">
      {data.title}
    </div>
  );
};

// Section boundary background node
const SectionBackgroundNode = ({ data }: { data: { color: string; label: string } }) => {
  return (
    <div 
      className="border-4 border-gray-800 rounded-3xl shadow-2xl opacity-20"
      style={{ 
        backgroundColor: data.color,
        width: '100%',
        height: '100%'
      }}
    >
      <div className="text-8xl font-black text-gray-400 opacity-20 p-8">
        {data.label}
      </div>
    </div>
  );
};

const nodeTypes = {
  content: ContentNode,
  sectionTitle: SectionTitleNode,
  sectionBackground: SectionBackgroundNode,
};

export default function ArchiveLayout({ 
  children, 
  sections = []
}: ArchiveLayoutProps) {
  // Flatten all blocks for mobile/tablet view
  const allBlocks = sections.flatMap(section => section.blocks);

  // Build single ReactFlow world with all sections
  const { nodes: flowNodes, edges: flowEdges } = buildFlowWorld(sections);

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  return (
    <>
      {/* Mobile & Tablet Layout (< 1024px) - Traditional Single Column Stack */}
      <div className="block lg:hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {children}
            {allBlocks.map((block) => (
              <div
                key={block.id}
                className={`
                  w-full rounded-lg overflow-hidden shadow-lg bg-white
                  ${block.size === "large" ? "min-h-[300px]" : ""}
                  ${block.size === "medium" ? "min-h-[250px]" : ""}
                  ${block.size === "small" ? "min-h-[200px]" : ""}
                `}
              >
                <div className="p-6">
                  {block.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= 1024px) - Single Zoomable ReactFlow World */}
      <div className="hidden lg:block w-screen h-screen">
        {children && (
          <div className="absolute top-8 left-8 z-50 max-w-2xl">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border-2 border-gray-300">
              {children}
            </div>
          </div>
        )}
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          attributionPosition="bottom-right"
        >
          <Background color="#aaa" gap={32} />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.id.includes("entry")) return "#10b981";
              if (node.id.includes("exit")) return "#f59e0b";
              if (node.type === "sectionBackground") return "#e5e7eb";
              return "#3b82f6";
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
            position="bottom-left"
          />
        </ReactFlow>
      </div>
    </>
  );
}

// Helper function to build the entire flow world from sections
function buildFlowWorld(sections: Section[]): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  sections.forEach((section, sectionIndex) => {
    // Add section background
    nodes.push({
      id: `${section.id}-background`,
      type: "sectionBackground",
      position: { x: section.bounds.x, y: section.bounds.y },
      data: { 
        color: section.backgroundColor || `hsl(${sectionIndex * 60}, 70%, 95%)`,
        label: `Section ${sectionIndex + 1}`
      },
      style: {
        width: section.bounds.width,
        height: section.bounds.height,
        zIndex: -1,
      },
      draggable: false,
      selectable: false,
    });

    // Add section title
    if (section.title) {
      nodes.push({
        id: `${section.id}-title`,
        type: "sectionTitle",
        position: { 
          x: section.bounds.x + 50, 
          y: section.bounds.y + 50 
        },
        data: { title: section.title },
        draggable: false,
      });
    }

    // Add entry point
    nodes.push({
      id: `${section.id}-entry`,
      type: "default",
      position: section.entryPoint,
      data: { label: "↓ Entry" },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { 
        background: "#10b981", 
        color: "white",
        border: "3px solid #059669",
        borderRadius: "50%",
        width: 100,
        height: 100,
        fontSize: 14,
        fontWeight: "bold",
      }
    });

    // Add content blocks
    section.blocks.forEach((block) => {
      nodes.push({
        id: block.id,
        type: "content",
        position: block.position,
        data: { 
          content: block.content,
          size: block.size || "medium"
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
    });

    // Add exit point
    const isLast = sectionIndex === sections.length - 1;
    nodes.push({
      id: `${section.id}-exit`,
      type: "default",
      position: section.exitPoint,
      data: { label: isLast ? "✓ End" : "↓ Exit" },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { 
        background: isLast ? "#ef4444" : "#f59e0b", 
        color: "white",
        border: isLast ? "3px solid #dc2626" : "3px solid #d97706",
        borderRadius: "50%",
        width: 100,
        height: 100,
        fontSize: 14,
        fontWeight: "bold",
      }
    });

    // Create edges within section
    if (section.blocks.length > 0) {
      // Entry to first block
      edges.push({
        id: `${section.id}-entry-to-first`,
        source: `${section.id}-entry`,
        target: section.blocks[0].id,
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 3 },
      });

      // Connect blocks sequentially
      for (let i = 0; i < section.blocks.length - 1; i++) {
        edges.push({
          id: `${section.id}-${i}-to-${i + 1}`,
          source: section.blocks[i].id,
          target: section.blocks[i + 1].id,
          animated: true,
          style: { stroke: "#3b82f6", strokeWidth: 3 },
        });
      }

      // Last block to exit
      edges.push({
        id: `${section.id}-last-to-exit`,
        source: section.blocks[section.blocks.length - 1].id,
        target: `${section.id}-exit`,
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 3 },
      });
    }

    // Connect exit to next section's entry
    if (sectionIndex < sections.length - 1) {
      edges.push({
        id: `${section.id}-to-${sections[sectionIndex + 1].id}`,
        source: `${section.id}-exit`,
        target: `${sections[sectionIndex + 1].id}-entry`,
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 4, strokeDasharray: "5,5" },
        label: "Continue →",
        labelStyle: { fill: "#8b5cf6", fontWeight: "bold" },
      });
    }
  });

  return { nodes, edges };
}
