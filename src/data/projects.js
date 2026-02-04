export const projects = [
  {
    id: "school-management-system",
    title: "School Management System",
    description:
      "A role-based school system focused on clean permissions, teacher workflows, and headmaster oversight.",
    status: "In progress",
    hero: "🏫",
    stack: ["React", "TailwindCSS", "Django", "PostgreSQL"],
    tags: ["frontend", "backend", "api", "ui"],
    githubUrl: "https://github.com/mohamed-tz-dev/school-management-system",
    liveUrl: "",

    caseStudy: {
      role: "Full-stack developer (solo)",
      timeline: "Ongoing",
      goal: "Build a school workflow system with clear roles and predictable data flow.",

      problem:
        "Many school processes are handled manually. This creates delays, duplicated work, and unclear responsibility between teachers and school leadership.",

      users: {
        roles: [
          "Headmaster (admin-level control)",
          "Teacher (daily academic workflows)"
        ],
        needs: [
          "Clear role permissions",
          "Simple daily actions (records, reporting)",
          "Reliable data and audit trail"
        ]
      },

      scope: {
        included: [
          "Authentication and role-based access",
          "Teacher workflows (records, updates)",
          "Admin oversight (users, roles, monitoring)"
        ],
        excluded: [
          "Payments/fees module (later)",
          "Parent portal (later)",
          "Advanced analytics (later)"
        ]
      },

      decisions: [
        "Use role-based access control to enforce permissions at route + API levels.",
        "Keep UI minimal and consistent to reduce user mistakes.",
        "Use a structured case-study format to document decisions and progress."
      ],

      currentState: {
        completed: [
          "Project structure + routing",
          "Roles concept and UI layout foundation"
        ],
        inProgress: [
          "Case study-driven project pages",
          "Backend endpoints and data models"
        ],
        limitations: [
          "Some modules are placeholders until core roles are stable."
        ]
      },

      nextSteps: [
        "Finalize core RBAC implementation (frontend + backend).",
        "Add first working workflow end-to-end (teacher → admin visibility).",
        "Add validations and error handling for real-world usage."
      ]
    }
  },

  {
    id: "ecommerce-website",
    title: "E-commerce Website",
    description:
      "A clean product-to-cart-to-order flow designed to scale into real payments and fulfillment later.",
    status: "In progress",
    hero: "🛒",
    stack: ["React", "TailwindCSS", "Django", "PostgreSQL"],
    tags: ["frontend", "backend", "ui", "api"],
    githubUrl: "https://github.com/mohamed-tz-dev/ecommerce-website",
    liveUrl: "",

    caseStudy: {
      role: "Full-stack developer (solo)",
      timeline: "Ongoing",
      goal: "Build a stable e-commerce flow with clean structure and predictable behavior.",

      problem:
        "Many beginner e-commerce projects stop at UI. The real challenge is building a reliable cart/order system with correct logic and clear edge case handling.",

      users: {
        roles: ["Customer", "Admin (later)"],
        needs: [
          "Fast product browsing",
          "Accurate cart totals",
          "Clear order status and confirmations"
        ]
      },

      scope: {
        included: [
          "Product listing and details",
          "Cart logic (add/remove/quantity)",
          "Order creation (basic)"
        ],
        excluded: [
          "Payments integration (later)",
          "Shipping/fulfillment logic (later)",
          "Admin dashboard (later)"
        ]
      },

      decisions: [
        "Prioritize correctness of cart/order logic before adding fancy UI.",
        "Keep components small and reusable to avoid duplication.",
        "Design with edge cases in mind (empty cart, invalid quantities, etc.)."
      ],

      currentState: {
        completed: [
          "UI foundation + pages routing",
          "Basic product and cart UI"
        ],
        inProgress: [
          "Order flow wiring",
          "Edge-case handling and validations"
        ],
        limitations: [
          "No payments yet; orders are logical only for now."
        ]
      },

      nextSteps: [
        "Finish cart state logic and validations.",
        "Implement order creation end-to-end (frontend → backend).",
        "Add clear order success/failure feedback UI."
      ]
    }
  }
];
