"use client";

import ArchiveLayout from "./archive-2026-layout";

export default function Archive2026() {
  // Define 5 sections in a single zoomable world
  // Each section is positioned in absolute coordinates
  const SECTION_WIDTH = 2000;
  const SECTION_HEIGHT = 1500;
  const SECTION_SPACING = 300;

  const sections = [
    {
      id: "section-1",
      title: "Chapter One: The Beginning",
      bounds: { 
        x: 0, 
        y: 0, 
        width: SECTION_WIDTH, 
        height: SECTION_HEIGHT 
      },
      entryPoint: { x: 1000, y: 100 }, // Top center of section
      exitPoint: { x: 1700, y: 1400 }, // Bottom right
      backgroundColor: "#fef3c7", // Light amber
      blocks: [
        {
          id: "s1-block-1",
          size: "large" as const,
          position: { x: 800, y: 400 },
          content: (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Opening Scene</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to the journey. This is the first content block in the first section.
                The flow starts from the entry point above and winds through each block.
              </p>
            </div>
          ),
        },
        {
          id: "s1-block-2",
          size: "medium" as const,
          position: { x: 300, y: 800 },
          content: (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">A Twist</h3>
              <p className="text-gray-700">
                The path meanders left, creating visual interest and guiding the reader's eye.
              </p>
            </div>
          ),
        },
        {
          id: "s1-block-3",
          size: "small" as const,
          position: { x: 1200, y: 1100 },
          content: (
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Transition</h4>
              <p className="text-gray-700 text-sm">Moving towards the exit...</p>
            </div>
          ),
        },
      ],
    },
    {
      id: "section-2",
      title: "Chapter Two: Rising Action",
      bounds: { 
        x: 0, 
        y: SECTION_HEIGHT + SECTION_SPACING, 
        width: SECTION_WIDTH, 
        height: SECTION_HEIGHT 
      },
      entryPoint: { x: 400, y: SECTION_HEIGHT + SECTION_SPACING + 100 },
      exitPoint: { x: 1000, y: SECTION_HEIGHT + SECTION_SPACING + 1400 },
      backgroundColor: "#ddd6fe", // Light purple
      blocks: [
        {
          id: "s2-block-1",
          size: "medium" as const,
          position: { x: 500, y: SECTION_HEIGHT + SECTION_SPACING + 500 },
          content: (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Development</h2>
              <p className="text-gray-700 leading-relaxed">
                The story continues as we move through this second section.
                Each section represents a distinct part of your narrative.
              </p>
            </div>
          ),
        },
        {
          id: "s2-block-2",
          size: "large" as const,
          position: { x: 1000, y: SECTION_HEIGHT + SECTION_SPACING + 900 },
          content: (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Main Content</h3>
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4" />
              <p className="text-gray-700">Visual elements can be included in any block.</p>
            </div>
          ),
        },
      ],
    },
    {
      id: "section-3",
      title: "Chapter Three: The Climax",
      bounds: { 
        x: 0, 
        y: (SECTION_HEIGHT + SECTION_SPACING) * 2, 
        width: SECTION_WIDTH, 
        height: SECTION_HEIGHT 
      },
      entryPoint: { x: 1000, y: (SECTION_HEIGHT + SECTION_SPACING) * 2 + 100 },
      exitPoint: { x: 600, y: (SECTION_HEIGHT + SECTION_SPACING) * 2 + 1400 },
      backgroundColor: "#fecaca", // Light red
      blocks: [
        {
          id: "s3-block-1",
          size: "large" as const,
          position: { x: 800, y: (SECTION_HEIGHT + SECTION_SPACING) * 2 + 500 },
          content: (
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Peak</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This section represents the climax of your content.
                The wandering path helps create tension and flow.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Notice how the ReactFlow library automatically creates smooth connections
                between blocks, forming a natural reading path through the entire world.
              </p>
            </div>
          ),
        },
        {
          id: "s3-block-2",
          size: "medium" as const,
          position: { x: 400, y: (SECTION_HEIGHT + SECTION_SPACING) * 2 + 1050 },
          content: (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Resolution Begins</h3>
              <p className="text-gray-700">The path starts to wind down...</p>
            </div>
          ),
        },
      ],
    },
    {
      id: "section-4",
      title: "Chapter Four: Falling Action",
      bounds: { 
        x: 0, 
        y: (SECTION_HEIGHT + SECTION_SPACING) * 3, 
        width: SECTION_WIDTH, 
        height: SECTION_HEIGHT 
      },
      entryPoint: { x: 1400, y: (SECTION_HEIGHT + SECTION_SPACING) * 3 + 100 },
      exitPoint: { x: 800, y: (SECTION_HEIGHT + SECTION_SPACING) * 3 + 1400 },
      backgroundColor: "#bbf7d0", // Light green
      blocks: [
        {
          id: "s4-block-1",
          size: "medium" as const,
          position: { x: 1200, y: (SECTION_HEIGHT + SECTION_SPACING) * 3 + 400 },
          content: (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Winding Down</h2>
              <p className="text-gray-700 leading-relaxed">
                As we approach the end, the blocks guide readers through the denouement.
              </p>
            </div>
          ),
        },
        {
          id: "s4-block-2",
          size: "small" as const,
          position: { x: 600, y: (SECTION_HEIGHT + SECTION_SPACING) * 3 + 800 },
          content: (
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Reflection</h4>
              <p className="text-gray-700 text-sm">Looking back on the journey...</p>
            </div>
          ),
        },
        {
          id: "s4-block-3",
          size: "medium" as const,
          position: { x: 900, y: (SECTION_HEIGHT + SECTION_SPACING) * 3 + 1150 },
          content: (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Almost There</h3>
              <p className="text-gray-700">One more section to go...</p>
            </div>
          ),
        },
      ],
    },
    {
      id: "section-5",
      title: "Chapter Five: The Conclusion",
      bounds: { 
        x: 0, 
        y: (SECTION_HEIGHT + SECTION_SPACING) * 4, 
        width: SECTION_WIDTH, 
        height: SECTION_HEIGHT 
      },
      entryPoint: { x: 800, y: (SECTION_HEIGHT + SECTION_SPACING) * 4 + 100 },
      exitPoint: { x: 1000, y: (SECTION_HEIGHT + SECTION_SPACING) * 4 + 1350 },
      backgroundColor: "#bfdbfe", // Light blue
      blocks: [
        {
          id: "s5-block-1",
          size: "large" as const,
          position: { x: 700, y: (SECTION_HEIGHT + SECTION_SPACING) * 4 + 550 },
          content: (
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The End</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This is the final section. The journey is complete.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Zoom out to see the entire world, or zoom in to explore individual sections.
                The path connects seamlessly through all 5 sections.
              </p>
            </div>
          ),
        },
        {
          id: "s5-block-2",
          size: "medium" as const,
          position: { x: 1000, y: (SECTION_HEIGHT + SECTION_SPACING) * 4 + 1050 },
          content: (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Closing Thoughts</h3>
              <p className="text-gray-700">
                Thank you for following this wandering path through the story world.
              </p>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <ArchiveLayout sections={sections}>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Archive 2026: Spring
        </h1>
        <p className="text-lg text-gray-600">
          A wandering narrative through a zoomable world with 5 connected sections
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Use controls to zoom and pan • Follow the animated path
        </p>
      </div>
    </ArchiveLayout>
  );
}
