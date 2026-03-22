import type { Section } from '../types'

export const curriculum: Section[] = [
  // ─── COMPUTER SCIENCE ───────────────────────────────────────────────────
  {
    id: 'computer-science',
    discipline: 'computer-science',
    title: 'Computer Science',
    description: 'Foundational theory, algorithms, data structures, and systems that underpin all of computation.',
    icon: '⬡',
    color: '--pulsar',
    topics: [
      {
        id: 'algorithms-data-structures',
        sectionId: 'computer-science',
        title: 'Algorithms & Data Structures',
        description: 'The building blocks of efficient computation.',
        entries: [
          {
            id: 'big-o-notation',
            topicId: 'algorithms-data-structures',
            sectionId: 'computer-science',
            slug: 'big-o-notation',
            title: 'Big-O Notation Deep Dive',
            subtitle: 'Understanding algorithmic complexity and why it matters for real-world performance.',
            date: '2025-01-10',
            difficulty: 'beginner',
            tags: ['algorithms', 'complexity', 'analysis', 'performance'],
            readTime: '12 min',
            content: [
              {
                type: 'paragraph',
                content: 'Big-O notation is the universal language of algorithm efficiency. It describes how the runtime or space requirements of an algorithm grow relative to input size, stripping away hardware-specific constants to expose the bare mathematical truth of an algorithm\'s scalability.',
              },
              {
                type: 'heading',
                content: 'Why Big-O Matters',
              },
              {
                type: 'paragraph',
                content: 'When input size is small, nearly any algorithm works. The real test comes at scale. An O(n²) algorithm processing 1,000 elements performs 1,000,000 operations; the same problem with 1,000,000 elements requires a trillion operations. Big-O helps engineers make decisions before writing a single line of code.',
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: 'Big-O describes the worst-case upper bound. Big-Ω (Omega) describes best-case, and Big-Θ (Theta) describes tight bounds. In practice, Big-O dominates engineering discourse.',
              },
              {
                type: 'heading',
                content: 'The Complexity Hierarchy',
              },
              {
                type: 'list',
                items: [
                  'O(1) — Constant: array index access, hash table lookup',
                  'O(log n) — Logarithmic: binary search, balanced BST ops',
                  'O(n) — Linear: single-pass array scan, linear search',
                  'O(n log n) — Linearithmic: merge sort, heap sort',
                  'O(n²) — Quadratic: bubble sort, naive matrix ops',
                  'O(2ⁿ) — Exponential: recursive subset enumeration',
                  'O(n!) — Factorial: brute-force travelling salesman',
                ],
              },
              {
                type: 'math',
                content: 'T(n) = O(f(n))  ⟺  ∃c > 0, n₀ : ∀n ≥ n₀,  T(n) ≤ c · f(n)',
              },
              {
                type: 'subheading',
                content: 'Practical Analysis Example',
              },
              {
                type: 'code',
                language: 'typescript',
                content: `// O(n²) — nested iteration
function hasDuplicate(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(n) — hash set approach
function hasDuplicateFast(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const n of arr) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
              },
              {
                type: 'callout',
                calloutType: 'tip',
                content: 'When analyzing nested loops, multiply their complexities. When analyzing sequential operations, take the dominant (largest) term.',
              },
              {
                type: 'paragraph',
                content: 'Space complexity follows identical rules but measures memory usage. The hash set solution above trades O(n) space for a dramatic runtime improvement — a recurring pattern called the space-time tradeoff.',
              },
            ],
          },
          {
            id: 'binary-search-trees',
            topicId: 'algorithms-data-structures',
            sectionId: 'computer-science',
            slug: 'binary-search-trees',
            title: 'Binary Search Trees',
            subtitle: 'Hierarchical data structures that maintain sorted order for efficient search, insertion, and deletion.',
            date: '2025-01-18',
            difficulty: 'intermediate',
            tags: ['data-structures', 'trees', 'BST', 'recursion'],
            readTime: '15 min',
            prerequisites: ['big-o-notation'],
            content: [
              {
                type: 'paragraph',
                content: 'A Binary Search Tree (BST) is a node-based data structure where each node holds a key, a left subtree containing only keys less than the node\'s key, and a right subtree containing only keys greater. This invariant enables O(log n) search in balanced trees.',
              },
              {
                type: 'heading',
                content: 'BST Invariant',
              },
              {
                type: 'math',
                content: 'For any node N:  max(left subtree) < N.key < min(right subtree)',
              },
              {
                type: 'callout',
                calloutType: 'warning',
                content: 'An unbalanced BST degrades to O(n) operations in the worst case. If you insert sorted data into a naive BST, you get a linked list.',
              },
              {
                type: 'code',
                language: 'typescript',
                content: `interface TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function insert(root: TreeNode | null, key: number): TreeNode {
  if (!root) return { key, left: null, right: null };
  if (key < root.key)  root.left  = insert(root.left,  key);
  else if (key > root.key) root.right = insert(root.right, key);
  return root;
}

function search(root: TreeNode | null, key: number): boolean {
  if (!root) return false;
  if (key === root.key) return true;
  return key < root.key
    ? search(root.left, key)
    : search(root.right, key);
}

// In-order traversal → sorted output
function inOrder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inOrder(root.left), root.key, ...inOrder(root.right)];
}`,
              },
              {
                type: 'heading',
                content: 'Self-Balancing Variants',
              },
              {
                type: 'list',
                items: [
                  'AVL Tree: strict height-balance (|height_left - height_right| ≤ 1), O(log n) guaranteed',
                  'Red-Black Tree: looser balance via coloring rules, favored by most language std libs',
                  'B-Tree: generalized to M children per node, optimal for disk-based storage',
                  'Treap: randomized priority + BST key, simpler to implement with probabilistic balance',
                ],
              },
              {
                type: 'paragraph',
                content: 'In-order traversal of a BST yields sorted output in O(n) time — a powerful property exploited by range queries and sorted iterators in real databases.',
              },
            ],
          },
        ],
      },
      {
        id: 'operating-systems',
        sectionId: 'computer-science',
        title: 'Operating Systems',
        description: 'Resource management, scheduling, and the kernel abstractions that enable modern computing.',
        entries: [
          {
            id: 'process-scheduling',
            topicId: 'operating-systems',
            sectionId: 'computer-science',
            slug: 'process-scheduling',
            title: 'Process Scheduling',
            subtitle: 'How operating systems decide which process runs next and why it profoundly shapes system responsiveness.',
            date: '2025-02-01',
            difficulty: 'intermediate',
            tags: ['OS', 'scheduling', 'concurrency', 'kernel'],
            readTime: '14 min',
            content: [
              {
                type: 'paragraph',
                content: 'Process scheduling is the kernel subsystem that multiplexes CPU time among ready processes. The scheduler must balance competing goals: maximizing CPU utilization, minimizing latency for interactive tasks, ensuring fairness, and meeting soft real-time deadlines.',
              },
              {
                type: 'heading',
                content: 'Scheduling Algorithms',
              },
              {
                type: 'table',
                headers: ['Algorithm', 'Preemptive?', 'Strengths', 'Weaknesses'],
                rows: [
                  ['FCFS', 'No', 'Simple, fair order', 'Convoy effect, poor latency'],
                  ['SJF', 'No', 'Optimal avg wait time', 'Requires burst time knowledge'],
                  ['Round Robin', 'Yes', 'Good response time', 'High context-switch overhead'],
                  ['Priority', 'Yes', 'Separates workload classes', 'Starvation of low-priority tasks'],
                  ['CFS (Linux)', 'Yes', 'Fair, scalable', 'Complex vruntime bookkeeping'],
                ],
              },
              {
                type: 'subheading',
                content: 'Completely Fair Scheduler',
              },
              {
                type: 'paragraph',
                content: 'Linux\'s CFS uses a red-black tree keyed on virtual runtime (vruntime) to always schedule the task that has received the least CPU time. Every nanosecond a task runs, its vruntime advances proportionally to its weight (nice value), ensuring fairness without a fixed time quantum.',
              },
              {
                type: 'callout',
                calloutType: 'info',
                content: 'Context switches save and restore the full CPU register state (PCB — Process Control Block). On x86-64 this involves 168 bytes of FPU/SSE state alone.',
              },
              {
                type: 'code',
                language: 'c',
                content: `/* Simplified Round Robin dispatcher concept */
typedef struct {
    int  pid;
    int  burst_remaining; /* ms */
    int  priority;
} Process;

void round_robin(Process procs[], int n, int quantum) {
    int time = 0, done = 0;
    while (done < n) {
        for (int i = 0; i < n; i++) {
            if (procs[i].burst_remaining <= 0) continue;
            int run = (procs[i].burst_remaining < quantum)
                      ? procs[i].burst_remaining : quantum;
            procs[i].burst_remaining -= run;
            time += run;
            if (procs[i].burst_remaining == 0) done++;
        }
    }
}`,
              },
              {
                type: 'paragraph',
                content: 'Modern systems layer multiple schedulers: a real-time class (SCHED_FIFO/SCHED_RR), the CFS normal class, and an idle scheduler. The kernel picks the highest-priority non-empty class at every scheduling point.',
              },
            ],
          },
          {
            id: 'memory-management',
            topicId: 'operating-systems',
            sectionId: 'computer-science',
            slug: 'memory-management',
            title: 'Memory Management',
            subtitle: 'Virtual memory, paging hierarchies, and how the OS creates the illusion of infinite private address spaces.',
            date: '2025-02-12',
            difficulty: 'advanced',
            tags: ['OS', 'memory', 'virtual-memory', 'paging', 'MMU'],
            readTime: '18 min',
            content: [
              {
                type: 'paragraph',
                content: 'Every modern OS gives each process the illusion of a private, contiguous address space through virtual memory. The Memory Management Unit (MMU) translates virtual addresses to physical addresses at hardware speed using page tables maintained by the kernel.',
              },
              {
                type: 'heading',
                content: 'Paging Architecture',
              },
              {
                type: 'paragraph',
                content: 'Memory is divided into fixed-size pages (typically 4 KiB on x86-64). A multi-level page table — 4 levels on x86-64 (PML4 → PDPT → PD → PT) — maps virtual page numbers to physical frame numbers. Each walk traverses up to 4 memory accesses, so the TLB caches recent translations.',
              },
              {
                type: 'math',
                content: 'Virtual Address:  [PML4 index | PDPT index | PD index | PT index | Page Offset]\n                   9 bits        9 bits       9 bits     9 bits       12 bits',
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: 'A TLB miss on a hot loop costs ~100 ns on modern hardware. Huge Pages (2 MiB / 1 GiB) reduce TLB pressure dramatically for memory-intensive workloads.',
              },
              {
                type: 'heading',
                content: 'Page Replacement Policies',
              },
              {
                type: 'list',
                items: [
                  'OPT (Optimal): evict the page used furthest in the future — theoretical, requires future knowledge',
                  'LRU (Least Recently Used): approximated via clock algorithm in Linux',
                  'CLOCK (Second Chance): circular buffer with reference bits, O(1) amortized',
                  'ARC (Adaptive Replacement Cache): balances recency vs frequency, used in ZFS',
                ],
              },
              {
                type: 'code',
                language: 'c',
                content: `/* mmap anonymous memory — underlying syscall for malloc */
#include <sys/mman.h>

void* alloc_pages(size_t n_pages) {
    void* ptr = mmap(
        NULL,
        n_pages * 4096,
        PROT_READ | PROT_WRITE,
        MAP_PRIVATE | MAP_ANONYMOUS,
        -1, 0
    );
    if (ptr == MAP_FAILED) return NULL;
    return ptr;
}`,
              },
              {
                type: 'paragraph',
                content: 'Copy-on-Write (COW) is the mechanism behind fork(): both parent and child share physical pages marked read-only. The first write triggers a page fault; the kernel copies the page, marks both copies writable, and resumes execution — zero unnecessary copies.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CODING ──────────────────────────────────────────────────────────────
  {
    id: 'coding',
    discipline: 'coding',
    title: 'Coding',
    description: 'Practical programming mastery — TypeScript depth, systems programming, and engineering craft.',
    icon: '◈',
    color: '--quasar',
    topics: [
      {
        id: 'typescript-mastery',
        sectionId: 'coding',
        title: 'TypeScript Mastery',
        description: 'Deep TypeScript — the type system features that separate good code from great code.',
        entries: [
          {
            id: 'typescript-generics',
            topicId: 'typescript-mastery',
            sectionId: 'coding',
            slug: 'typescript-generics',
            title: 'TypeScript Generics',
            subtitle: 'Writing reusable, type-safe abstractions that work across any data shape.',
            date: '2025-01-25',
            difficulty: 'intermediate',
            tags: ['typescript', 'generics', 'type-system', 'reusability'],
            readTime: '13 min',
            content: [
              {
                type: 'paragraph',
                content: 'Generics are TypeScript\'s mechanism for writing code that remains fully type-safe regardless of the concrete types it operates on. They are parameters for types — just as function parameters abstract over values, generics abstract over types.',
              },
              {
                type: 'heading',
                content: 'Generic Functions',
              },
              {
                type: 'code',
                language: 'typescript',
                content: `// Identity function — simplest generic
function identity<T>(value: T): T {
  return value;
}

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic async wrapper with error handling
async function safeRun<T>(
  fn: () => Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    return [await fn(), null];
  } catch (e) {
    return [null, e instanceof Error ? e : new Error(String(e))];
  }
}

// Usage
const [data, err] = await safeRun(() => fetch('/api/data').then(r => r.json()));`,
              },
              {
                type: 'heading',
                content: 'Conditional & Mapped Types',
              },
              {
                type: 'code',
                language: 'typescript',
                content: `// Conditional type — the ternary of the type world
type IsArray<T> = T extends unknown[] ? true : false;
type Test1 = IsArray<string[]>;  // true
type Test2 = IsArray<string>;    // false

// Mapped type — transform every property
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Infer — extract types from other types
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type Awaited<T>    = T extends Promise<infer U> ? U : T;`,
              },
              {
                type: 'callout',
                calloutType: 'tip',
                content: 'Use `extends` constraints aggressively. Unconstrained generics (T extends unknown) catch type errors at call sites rather than at the implementation — exactly where they should be caught.',
              },
              {
                type: 'paragraph',
                content: 'Generic default parameters (`<T = string>`) provide sensible fallbacks while keeping the door open for specialization. Combined with conditional types, they enable sophisticated type-level programming that reduces runtime validation overhead.',
              },
            ],
          },
          {
            id: 'discriminated-unions',
            topicId: 'typescript-mastery',
            sectionId: 'coding',
            slug: 'discriminated-unions',
            title: 'Discriminated Unions',
            subtitle: 'Exhaustive type-safe state modeling with TypeScript\'s most powerful pattern.',
            date: '2025-02-05',
            difficulty: 'intermediate',
            tags: ['typescript', 'unions', 'pattern-matching', 'state-machines'],
            readTime: '11 min',
            content: [
              {
                type: 'paragraph',
                content: 'A discriminated union is a union of object types that all share a common literal-typed field (the discriminant). TypeScript uses this tag to narrow the type in switch/if branches, enabling exhaustive pattern matching that the compiler enforces.',
              },
              {
                type: 'code',
                language: 'typescript',
                content: `type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error';   message: string };

function render<T>(state: RequestState<T>): string {
  switch (state.status) {
    case 'idle':    return 'Waiting...';
    case 'loading': return 'Fetching data...';
    case 'success': return \`Data: \${JSON.stringify(state.data)}\`;
    case 'error':   return \`Error: \${state.message}\`;
    // TypeScript ensures every case is covered:
    // default: state satisfies never;
  }
}`,
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: 'The `never` exhaustiveness check is your safety net. Assign the default branch to a `never`-typed variable — if you ever miss a case, TypeScript errors at compile time, not runtime.',
              },
              {
                type: 'heading',
                content: 'Modeling Real-World State',
              },
              {
                type: 'list',
                items: [
                  'Payment state: pending | authorized | captured | refunded | failed',
                  'WebSocket: connecting | open | closing | closed',
                  'Form field: pristine | touched | validating | valid | invalid',
                  'Auth: anonymous | authenticating | authenticated | expired',
                ],
              },
              {
                type: 'paragraph',
                content: 'Discriminated unions eliminate impossible states by making them unrepresentable in the type system. This is fundamentally different from using boolean flags, which multiply into 2ⁿ states — many of which are nonsensical.',
              },
            ],
          },
        ],
      },
      {
        id: 'systems-programming',
        sectionId: 'coding',
        title: 'Systems Programming',
        description: 'Low-level programming, memory model, and the C runtime that everything else sits on top of.',
        entries: [
          {
            id: 'pointers-in-c',
            topicId: 'systems-programming',
            sectionId: 'coding',
            slug: 'pointers-in-c',
            title: 'Pointers in C',
            subtitle: 'Demystifying memory addresses, pointer arithmetic, and why C programmers think in bytes.',
            date: '2025-02-20',
            difficulty: 'intermediate',
            tags: ['C', 'pointers', 'memory', 'systems'],
            readTime: '16 min',
            content: [
              {
                type: 'paragraph',
                content: 'A pointer is a variable that stores a memory address. In C, every object lives at some address in memory; a pointer lets you hold, pass, and manipulate that address explicitly. This direct memory access is what gives C both its power and its danger.',
              },
              {
                type: 'heading',
                content: 'Pointer Fundamentals',
              },
              {
                type: 'code',
                language: 'c',
                content: `#include <stdio.h>

int main(void) {
    int  x = 42;
    int *p = &x;          /* p holds the address of x */

    printf("value: %d\\n",  x);    /* 42 */
    printf("address: %p\\n", (void*)p); /* e.g. 0x7ffd... */
    printf("via ptr: %d\\n", *p);  /* dereference: 42 */

    *p = 100;             /* modify x through pointer */
    printf("new value: %d\\n", x); /* 100 */

    /* Pointer arithmetic: steps by sizeof(int) */
    int arr[] = {1, 2, 3, 4, 5};
    int *q = arr;
    printf("third: %d\\n", *(q + 2)); /* 3 */
    return 0;
}`,
              },
              {
                type: 'callout',
                calloutType: 'warning',
                content: 'Never dereference a NULL pointer, an uninitialized pointer, or a dangling pointer (pointing to freed memory). These are undefined behavior — the C standard permits anything, including silent data corruption.',
              },
              {
                type: 'heading',
                content: 'Function Pointers',
              },
              {
                type: 'code',
                language: 'c',
                content: `typedef int (*Comparator)(const void*, const void*);

int cmp_int(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int arr[] = {5, 2, 8, 1, 9};
qsort(arr, 5, sizeof(int), cmp_int);
/* arr is now: 1 2 5 8 9 */`,
              },
              {
                type: 'paragraph',
                content: 'Function pointers enable callbacks, dispatch tables, and polymorphism in C. The C standard library\'s qsort takes a comparator function pointer, allowing generic sorting of any data type — a precursor to what generics do in higher-level languages.',
              },
            ],
          },
          {
            id: 'stack-vs-heap',
            topicId: 'systems-programming',
            sectionId: 'coding',
            slug: 'stack-vs-heap',
            title: 'Stack vs Heap',
            subtitle: 'The two memory regions every programmer uses but few truly understand.',
            date: '2025-03-01',
            difficulty: 'beginner',
            tags: ['memory', 'C', 'stack', 'heap', 'systems'],
            readTime: '10 min',
            content: [
              {
                type: 'paragraph',
                content: 'Every program has two primary regions of memory: the stack, which is managed automatically by the compiler, and the heap, which is managed explicitly by the programmer (or garbage collector). Understanding the difference is non-negotiable for writing performant, correct software.',
              },
              {
                type: 'heading',
                content: 'The Stack',
              },
              {
                type: 'list',
                items: [
                  'LIFO (Last In, First Out) allocation — push on call, pop on return',
                  'Fixed size per thread (typically 1–8 MiB) — overflow = segfault',
                  'Allocation/deallocation is a single register increment/decrement (O(1))',
                  'Automatic lifetime — freed when function returns',
                  'CPU cache-friendly due to sequential access patterns',
                ],
              },
              {
                type: 'heading',
                content: 'The Heap',
              },
              {
                type: 'code',
                language: 'c',
                content: `#include <stdlib.h>
#include <string.h>

char* make_greeting(const char *name) {
    /* Stack allocation: would be gone after return */
    /* char buf[256]; return buf; ← UNDEFINED BEHAVIOR */

    /* Heap allocation: survives until free() */
    size_t len = strlen("Hello, ") + strlen(name) + 2;
    char *buf = malloc(len);
    if (!buf) return NULL;
    snprintf(buf, len, "Hello, %s!", name);
    return buf; /* caller must free(buf) */
}`,
              },
              {
                type: 'callout',
                calloutType: 'info',
                content: 'Modern allocators (jemalloc, mimalloc) maintain per-thread caches of size classes to minimize lock contention and fragmentation. malloc() is not a simple sbrk() syscall anymore.',
              },
              {
                type: 'paragraph',
                content: 'Rust\'s ownership system automates heap deallocation without garbage collection by tracking object lifetimes at compile time. Every heap allocation has exactly one owner; when the owner goes out of scope, the memory is freed deterministically.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── MATHEMATICS ─────────────────────────────────────────────────────────
  {
    id: 'mathematics',
    discipline: 'mathematics',
    title: 'Mathematics',
    description: 'The language of the universe — discrete structures, linear algebra, and the proofs that underlie computer science.',
    icon: '∑',
    color: '--pulsar',
    topics: [
      {
        id: 'discrete-mathematics',
        sectionId: 'mathematics',
        title: 'Discrete Mathematics',
        description: 'Graphs, combinatorics, logic, and proof techniques.',
        entries: [
          {
            id: 'graph-theory-basics',
            topicId: 'discrete-mathematics',
            sectionId: 'mathematics',
            slug: 'graph-theory-basics',
            title: 'Graph Theory Basics',
            subtitle: 'Vertices, edges, and the surprisingly deep mathematics of connectivity.',
            date: '2025-01-15',
            difficulty: 'beginner',
            tags: ['graph-theory', 'discrete-math', 'algorithms', 'networks'],
            readTime: '12 min',
            content: [
              {
                type: 'paragraph',
                content: 'A graph G = (V, E) is a set of vertices V connected by edges E. This deceptively simple structure models road networks, social graphs, compiler dependency trees, protein interaction networks, and the internet itself.',
              },
              {
                type: 'heading',
                content: 'Basic Definitions',
              },
              {
                type: 'list',
                items: [
                  'Undirected graph: edges have no direction — (u,v) = (v,u)',
                  'Directed graph (digraph): edges have direction — (u,v) ≠ (v,u)',
                  'Weighted graph: each edge carries a numeric weight',
                  'Degree of vertex v: number of edges incident to v',
                  'Path: sequence of vertices where consecutive pairs are edges',
                  'Cycle: path that begins and ends at the same vertex',
                  'Connected graph: every vertex is reachable from every other',
                ],
              },
              {
                type: 'math',
                content: 'Handshaking Lemma:  Σ deg(v) = 2|E|\n\nIn any graph, the sum of all vertex degrees equals twice the edge count.',
              },
              {
                type: 'heading',
                content: 'Graph Representations',
              },
              {
                type: 'table',
                headers: ['Representation', 'Space', 'Edge Query', 'Best For'],
                rows: [
                  ['Adjacency Matrix', 'O(V²)', 'O(1)', 'Dense graphs, fast edge lookup'],
                  ['Adjacency List', 'O(V+E)', 'O(degree)', 'Sparse graphs, BFS/DFS'],
                  ['Edge List', 'O(E)', 'O(E)', 'Sorting edges (Kruskal\'s MST)'],
                ],
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: 'BFS from a source vertex finds shortest paths in unweighted graphs. DFS reveals back-edges (cycles), articulation points, and strongly connected components.',
              },
              {
                type: 'paragraph',
                content: 'Eulerian paths visit every edge exactly once; Hamiltonian paths visit every vertex exactly once. Finding Eulerian paths is polynomial (Hierholzer\'s algorithm), while Hamiltonian paths are NP-complete — a stark illustration of computational complexity hiding in plain sight.',
              },
            ],
          },
          {
            id: 'proof-by-induction',
            topicId: 'discrete-mathematics',
            sectionId: 'mathematics',
            slug: 'proof-by-induction',
            title: 'Proof by Induction',
            subtitle: 'The mathematician\'s most elegant tool for proving statements over infinite sets.',
            date: '2025-01-28',
            difficulty: 'beginner',
            tags: ['proof', 'induction', 'discrete-math', 'logic'],
            readTime: '10 min',
            content: [
              {
                type: 'paragraph',
                content: 'Mathematical induction proves a statement P(n) holds for all natural numbers n by: first proving P(0) or P(1) (the base case), then proving that if P(k) holds, P(k+1) also holds (the inductive step). Like dominoes — knock the first one, and they all fall.',
              },
              {
                type: 'heading',
                content: 'Structure of an Inductive Proof',
              },
              {
                type: 'numbered-list',
                items: [
                  'State the proposition P(n) precisely',
                  'Prove the base case: P(1) is true',
                  'State the inductive hypothesis: assume P(k) is true for some k ≥ 1',
                  'Prove the inductive step: show P(k) → P(k+1)',
                  'Conclude: P(n) is true for all n ≥ 1',
                ],
              },
              {
                type: 'subheading',
                content: 'Classic Example: Sum Formula',
              },
              {
                type: 'math',
                content: 'Prove:  1 + 2 + 3 + ... + n  =  n(n+1)/2\n\nBase:   P(1): 1 = 1(2)/2 = 1  ✓\n\nStep:   Assume P(k): 1+2+...+k = k(k+1)/2\n        Show P(k+1): 1+2+...+k+(k+1) = (k+1)(k+2)/2\n\n        LHS = k(k+1)/2 + (k+1)          [by hypothesis]\n            = (k+1)[k/2 + 1]\n            = (k+1)(k+2)/2  ✓',
              },
              {
                type: 'callout',
                calloutType: 'warning',
                content: 'Strong induction assumes P(1), P(2), ..., P(k) are all true (not just P(k)) to prove P(k+1). Use it when the inductive step requires more than just the immediately preceding case.',
              },
              {
                type: 'paragraph',
                content: 'Structural induction extends this to recursive data structures: prove the base case (empty list, leaf node), then prove the recursive case assuming the property holds for all substructures. This is exactly how recursive algorithm correctness proofs work.',
              },
            ],
          },
        ],
      },
      {
        id: 'linear-algebra',
        sectionId: 'mathematics',
        title: 'Linear Algebra',
        description: 'Vectors, matrices, transformations — the mathematics powering graphics, ML, and physics simulation.',
        entries: [
          {
            id: 'matrix-multiplication',
            topicId: 'linear-algebra',
            sectionId: 'mathematics',
            slug: 'matrix-multiplication',
            title: 'Matrix Multiplication',
            subtitle: 'Composition of linear transformations and why the algorithm isn\'t what your intuition suggests.',
            date: '2025-02-08',
            difficulty: 'intermediate',
            tags: ['linear-algebra', 'matrices', 'transformations', 'ML'],
            readTime: '13 min',
            content: [
              {
                type: 'paragraph',
                content: 'Matrix multiplication represents the composition of linear transformations. If A transforms space one way and B transforms it another, AB is the transformation that does B first, then A. This is not element-wise multiplication — it is a fundamentally different operation encoding structural relationships.',
              },
              {
                type: 'math',
                content: '(AB)ᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ\n\nRequires: cols(A) = rows(B)\nResult shape: (m×k)(k×n) → (m×n)',
              },
              {
                type: 'callout',
                calloutType: 'warning',
                content: 'Matrix multiplication is NOT commutative: AB ≠ BA in general. It IS associative: (AB)C = A(BC). This matters enormously for chaining transformations efficiently.',
              },
              {
                type: 'code',
                language: 'typescript',
                content: `type Matrix = number[][];

function matMul(A: Matrix, B: Matrix): Matrix {
  const m = A.length, k = A[0].length, n = B[0].length;
  const C: Matrix = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      for (let p = 0; p < k; p++)
        C[i][j] += A[i][p] * B[p][j];

  return C;
}
// Naive: O(n³) — Strassen achieves O(n^2.807)
// BLAS libraries exploit cache hierarchy for practical speedup`,
              },
              {
                type: 'heading',
                content: 'Special Matrices',
              },
              {
                type: 'list',
                items: [
                  'Identity (I): AI = IA = A — the multiplicative identity',
                  'Diagonal: zero off-diagonal — multiplication scales axes independently',
                  'Orthogonal (Q): QᵀQ = I — rotations and reflections, preserve lengths',
                  'Symmetric: A = Aᵀ — covariance matrices, always real eigenvalues',
                  'Singular: det(A) = 0 — no inverse, collapses at least one dimension',
                ],
              },
              {
                type: 'paragraph',
                content: 'Neural network forward passes are fundamentally sequences of matrix multiplications interleaved with non-linearities. The push for better hardware accelerators (GPUs, TPUs) is largely a push for faster matrix multiplication.',
              },
            ],
          },
          {
            id: 'eigenvalues',
            topicId: 'linear-algebra',
            sectionId: 'mathematics',
            slug: 'eigenvalues',
            title: 'Eigenvalues & Eigenvectors',
            subtitle: 'The directions a matrix cannot twist — only stretch or shrink.',
            date: '2025-02-22',
            difficulty: 'advanced',
            tags: ['linear-algebra', 'eigenvalues', 'PCA', 'diagonalization'],
            readTime: '16 min',
            content: [
              {
                type: 'paragraph',
                content: 'An eigenvector of a matrix A is a non-zero vector v such that Av = λv — multiplying by A only scales v by a scalar λ (the eigenvalue) without changing its direction. These special vectors reveal the intrinsic geometry of the transformation.',
              },
              {
                type: 'math',
                content: 'Av = λv\n\nCharacteristic equation:  det(A - λI) = 0\n\nSolve for λ, then solve (A - λI)v = 0 for eigenvectors.',
              },
              {
                type: 'heading',
                content: 'Applications',
              },
              {
                type: 'list',
                items: [
                  'PCA (Principal Component Analysis): eigenvectors of covariance matrix are principal components',
                  'PageRank: dominant eigenvector of the web\'s link matrix',
                  'Quantum mechanics: observables are Hermitian operators; eigenvalues are measured values',
                  'Stability analysis: system is stable iff all eigenvalues have negative real parts',
                  'Graph spectra: eigenvalues of adjacency matrix encode connectivity properties',
                ],
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: 'Symmetric matrices always have real eigenvalues and orthogonal eigenvectors (Spectral Theorem). This is why covariance matrices in statistics are so well-behaved analytically.',
              },
              {
                type: 'paragraph',
                content: 'Diagonalization expresses A = PDP⁻¹ where D is diagonal (eigenvalues on diagonal) and P\'s columns are eigenvectors. This makes computing Aⁿ trivial: Aⁿ = PDⁿP⁻¹, since Dⁿ just raises each diagonal entry to the nth power.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── PHYSICS ─────────────────────────────────────────────────────────────
  {
    id: 'physics',
    discipline: 'physics',
    title: 'Physics',
    description: 'The rules of nature — from billiard balls to quantum uncertainty to relativistic spacetime.',
    icon: '⚛',
    color: '--nova',
    topics: [
      {
        id: 'classical-mechanics',
        sectionId: 'physics',
        title: 'Classical Mechanics',
        description: 'Newton\'s laws, energy, momentum, and the deterministic universe.',
        entries: [
          {
            id: 'newtons-laws',
            topicId: 'classical-mechanics',
            sectionId: 'physics',
            slug: 'newtons-laws',
            title: "Newton's Laws Revisited",
            subtitle: 'Three laws that built civilization — and the subtle depths most textbooks skip.',
            date: '2025-01-20',
            difficulty: 'beginner',
            tags: ['mechanics', 'forces', 'newton', 'dynamics'],
            readTime: '11 min',
            content: [
              {
                type: 'paragraph',
                content: "Newton's three laws of motion have been the cornerstone of physics for 340 years. Yet their apparent simplicity conceals profound subtleties: inertial reference frames, the definition of force, and the implicit assumptions about absolute time that Einstein would eventually shatter.",
              },
              {
                type: 'heading',
                content: 'The Three Laws',
              },
              {
                type: 'math',
                content: 'I.   ΣF = 0  ⟹  a = 0   (inertia)\nII.  ΣF = ma           (dynamics)\nIII. F₁₂ = -F₂₁        (action-reaction)',
              },
              {
                type: 'quote',
                content: 'Every body perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed upon it. — Isaac Newton, Principia Mathematica (1687)',
              },
              {
                type: 'problem',
                label: 'PROBLEM 1',
                content: 'A 5 kg block rests on a frictionless surface. A horizontal force of 20 N is applied. What is the acceleration? If the force is applied for 3 seconds, what is the final velocity?',
              },
              {
                type: 'solution',
                label: 'SOLUTION 1',
                content: 'Using F = ma:\na = F/m = 20 N / 5 kg = 4 m/s²\n\nUsing v = u + at (starting from rest, u = 0):\nv = 0 + (4)(3) = 12 m/s\n\nFinal velocity: 12 m/s in the direction of applied force.',
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: 'The First Law is not a special case of the Second Law. It defines what an inertial reference frame is — a frame where free particles travel in straight lines. The Second Law only applies in inertial frames.',
              },
              {
                type: 'paragraph',
                content: "The Third Law guarantees momentum conservation: internal forces cancel, so the total momentum of an isolated system is constant. This is not merely Newtonian — it's a consequence of translational symmetry in spacetime (Noether's theorem).",
              },
            ],
          },
          {
            id: 'conservation-of-energy',
            topicId: 'classical-mechanics',
            sectionId: 'physics',
            slug: 'conservation-of-energy',
            title: 'Conservation of Energy',
            subtitle: 'The most powerful principle in physics — energy is never created or destroyed, only transformed.',
            date: '2025-02-03',
            difficulty: 'beginner',
            tags: ['energy', 'conservation', 'work', 'thermodynamics'],
            readTime: '12 min',
            content: [
              {
                type: 'paragraph',
                content: "Conservation of energy is a consequence of time-translation symmetry: the laws of physics don't change over time, therefore energy is conserved (Noether's theorem). This single principle solves problems that would otherwise require solving differential equations of motion.",
              },
              {
                type: 'math',
                content: 'E_total = KE + PE = constant (in conservative systems)\n\nKE = ½mv²\nPE_gravity = mgh\nPE_spring = ½kx²\n\nWork-Energy Theorem:  W_net = ΔKE',
              },
              {
                type: 'problem',
                label: 'PROBLEM 2',
                content: 'A 2 kg ball is dropped from a height of 10 m (ignoring air resistance). What is its speed just before impact?',
              },
              {
                type: 'solution',
                label: 'SOLUTION 2',
                content: 'Set the ground as the reference level (PE = 0 at ground).\n\nInitially: KE₀ = 0, PE₀ = mgh = 2 × 9.8 × 10 = 196 J\nFinally:   PE_f = 0, KE_f = ½mv²\n\nBy conservation: KE_f = PE₀\n½mv² = 196 J\nv² = 2(196)/2 = 196\nv = 14 m/s',
              },
              {
                type: 'callout',
                calloutType: 'info',
                content: 'Friction is not a violation of energy conservation — kinetic energy converts to thermal energy (molecular vibration). Energy is still conserved; it\'s just no longer mechanically useful.',
              },
              {
                type: 'quote',
                content: 'There is a fact, or if you wish, a law, governing all natural phenomena that are known to date. There is no known exception to this law — it is exact so far as we know. The law is called the conservation of energy. — Richard Feynman',
              },
            ],
          },
        ],
      },
      {
        id: 'quantum-basics',
        sectionId: 'physics',
        title: 'Quantum Basics',
        description: "The stranger story — wave functions, uncertainty, and the universe's probabilistic substrate.",
        entries: [
          {
            id: 'wave-particle-duality',
            topicId: 'quantum-basics',
            sectionId: 'physics',
            slug: 'wave-particle-duality',
            title: 'Wave-Particle Duality',
            subtitle: 'Light is both a wave and a particle — and the experiment that proved it haunts physicists still.',
            date: '2025-02-15',
            difficulty: 'intermediate',
            tags: ['quantum', 'wave-particle', 'double-slit', 'photons'],
            readTime: '14 min',
            content: [
              {
                type: 'paragraph',
                content: "Wave-particle duality is the empirical fact that quantum objects behave as waves in some experiments and as particles in others. This isn't a classical wave sometimes and classical particle other times — it's a genuinely new kind of object that our everyday language struggles to describe.",
              },
              {
                type: 'heading',
                content: 'The Double-Slit Experiment',
              },
              {
                type: 'paragraph',
                content: 'Fire electrons one at a time at a barrier with two slits. No individual electron is split — each hits the detector as a single point. Yet over millions of electrons, an interference pattern emerges — the statistical pattern of a wave diffracting through both slits simultaneously.',
              },
              {
                type: 'image',
                content: 'https://picsum.photos/seed/double-slit-quantum/1200/500',
                alt: 'Double slit interference pattern',
                caption: 'The interference pattern emerging from single-electron double-slit experiment',
              },
              {
                type: 'math',
                content: "de Broglie relation:  λ = h/p  (every particle has an associated wavelength)\n\nWhere h = 6.626 × 10⁻³⁴ J·s (Planck's constant)\nand   p = mv (momentum)",
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: "Placing a detector at the slits to determine which slit the electron passed through destroys the interference pattern. The act of measurement collapses the wave function — observation changes the outcome. This is not a technology limitation; it's fundamental.",
              },
              {
                type: 'quote',
                content: "If you are not completely confused by quantum mechanics, you do not understand it. — John Wheeler",
              },
              {
                type: 'paragraph',
                content: "The Copenhagen interpretation says the question 'which slit did it go through before measurement?' is literally meaningless. Many-Worlds says the electron went through both slits in different branches of a splitting universe. Seventy years on, physicists still argue about this.",
              },
            ],
          },
          {
            id: 'uncertainty-principle',
            topicId: 'quantum-basics',
            sectionId: 'physics',
            slug: 'uncertainty-principle',
            title: 'The Uncertainty Principle',
            subtitle: "Heisenberg's inequality isn't about measurement disturbance — it reflects nature's irreducible fuzziness.",
            date: '2025-03-02',
            difficulty: 'intermediate',
            tags: ['quantum', 'heisenberg', 'uncertainty', 'operators'],
            readTime: '13 min',
            content: [
              {
                type: 'paragraph',
                content: "The Heisenberg Uncertainty Principle states that the position and momentum of a particle cannot simultaneously be known with arbitrary precision. This is not a statement about the clumsiness of our instruments — it's a mathematical theorem about the wave functions that describe quantum states.",
              },
              {
                type: 'math',
                content: 'σ_x · σ_p  ≥  ħ/2\n\nWhere ħ = h/(2π) ≈ 1.055 × 10⁻³⁴ J·s\nσ_x = standard deviation of position\nσ_p = standard deviation of momentum\n\nAlso:  σ_E · σ_t  ≥  ħ/2  (energy-time uncertainty)',
              },
              {
                type: 'problem',
                label: 'PROBLEM 3',
                content: "An electron's position is measured to within 1 nm. What is the minimum uncertainty in its momentum? What does this imply for its velocity uncertainty? (mₑ = 9.11 × 10⁻³¹ kg)",
              },
              {
                type: 'solution',
                label: 'SOLUTION 3',
                content: "Given: σ_x = 1 nm = 1 × 10⁻⁹ m\n\nMinimum σ_p:\nσ_p ≥ ħ/(2σ_x)\nσ_p ≥ (1.055 × 10⁻³⁴) / (2 × 1 × 10⁻⁹)\nσ_p ≥ 5.27 × 10⁻²⁶ kg·m/s\n\nVelocity uncertainty:\nσ_v = σ_p / mₑ = 5.27 × 10⁻²⁶ / 9.11 × 10⁻³¹\nσ_v ≈ 57,900 m/s ≈ 57.9 km/s",
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: "The energy-time uncertainty (σ_E·σ_t ≥ ħ/2) explains why virtual particles can exist briefly, why spectral lines have finite width, and why radioactive decay rates are probabilistic. It's everywhere in quantum field theory.",
              },
              {
                type: 'paragraph',
                content: "The uncertainty principle is a consequence of the Fourier transform relationship between position-space and momentum-space wave functions. A localized wave packet (small σ_x) requires a broad spread of frequencies (large σ_p). This is a mathematical identity, as fundamental as Pythagoras' theorem.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── CHESS ───────────────────────────────────────────────────────────────
  {
    id: 'chess',
    discipline: 'chess',
    title: 'Chess',
    description: 'The infinite game — opening theory, positional understanding, endgame precision, and the calculation that separates intuition from mastery.',
    icon: '♟',
    color: '--asteroid',
    topics: [
      {
        id: 'opening-theory',
        sectionId: 'chess',
        title: 'Opening Theory',
        description: 'The first 15 moves that shape everything which follows.',
        entries: [
          {
            id: 'sicilian-defense',
            topicId: 'opening-theory',
            sectionId: 'chess',
            slug: 'sicilian-defense',
            title: 'Sicilian Defense',
            subtitle: "The world's most popular chess opening — asymmetric, aggressive, and endlessly complex.",
            date: '2025-01-12',
            difficulty: 'intermediate',
            tags: ['openings', 'sicilian', 'black', 'counter-attack'],
            readTime: '14 min',
            content: [
              {
                type: 'paragraph',
                content: "The Sicilian Defense (1.e4 c5) is Black's most combative response to 1.e4. By playing 1...c5 instead of 1...e5, Black fights for the center asymmetrically — avoiding a mirror image position and accepting a slightly inferior pawn structure in exchange for dynamic counterplay and rich middlegame complications.",
              },
              {
                type: 'heading',
                content: 'Main Variation Tree',
              },
              {
                type: 'table',
                headers: ['Variation', 'Key Moves', 'Character', 'Famous Players'],
                rows: [
                  ['Najdorf', '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6', 'Ultra-sharp, tactical', 'Fischer, Kasparov, Topalov'],
                  ['Dragon', '...g6, Bg7, d6, 0-0', 'Double-edged, piece play', 'Geller, Kasimdzanov'],
                  ['Scheveningen', '...e6, d6, Nf6, Be7', 'Solid, flexible', 'Kasparov, Polgar'],
                  ['Classical', '...Nc6, d6, Nf6', 'Solid development', 'Sveshnikov'],
                  ['Kan/Taimanov', '...a6 or Nc6, e6', 'Elastic, waiting', 'Taimanov, Kan'],
                ],
              },
              {
                type: 'subheading',
                content: 'The Najdorf: Why It Dominates',
              },
              {
                type: 'paragraph',
                content: "5...a6 (the Najdorf move) looks innocuous but accomplishes several things: it prevents Nb5, prepares b5 expansion, keeps options open for ...e5 or ...e6, and takes the bishop on e2 off the long diagonal. Bobby Fischer called it 'best by test.'",
              },
              {
                type: 'list',
                items: [
                  'White attacks kingside with f4-f5 or h4-h5 or g4-g5',
                  'Black counters queenside with ...b5-b4, ...Nxe4, or ...d5 break',
                  'Both sides castle and immediately attack each other\'s kings',
                  'The position requires concrete calculation rather than general principles',
                  'Pawn sacrifices (gambits) are common on both sides to open files',
                ],
              },
              {
                type: 'callout',
                calloutType: 'tip',
                content: 'As Black in the Sicilian, always count the queenside pawns. Your a- and b-pawns are often your most important long-term assets — do not trade them lightly.',
              },
              {
                type: 'paragraph',
                content: "Statistics confirm the Sicilian's effectiveness: it produces the most decisive games (fewest draws) of any reply to 1.e4, and Black's win percentage is significantly higher than in symmetrical openings. The asymmetry breeds life.",
              },
            ],
          },
          {
            id: 'queens-gambit',
            topicId: 'opening-theory',
            sectionId: 'chess',
            slug: 'queens-gambit',
            title: "Queen's Gambit",
            subtitle: "1.d4 d5 2.c4 — not really a gambit. One of chess's oldest and most theoretically dense openings.",
            date: '2025-01-30',
            difficulty: 'beginner',
            tags: ['openings', 'queens-gambit', 'white', 'd4'],
            readTime: '12 min',
            content: [
              {
                type: 'paragraph',
                content: "The Queen's Gambit (1.d4 d5 2.c4) is perhaps chess's most classical opening. White offers the c4-pawn in exchange for rapid development and central control. Unlike King's Gambit, accepting it (2...dxc4) gives White a huge center — so most strong players decline.",
              },
              {
                type: 'table',
                headers: ['Response', 'Move', 'Idea', 'Difficulty'],
                rows: [
                  ["QGD (Declined)", '2...e6', 'Solid, supports d5', 'Beginner'],
                  ["QGA (Accepted)", '2...dxc4', 'Give pawn, develop fast', 'Intermediate'],
                  ["Slav Defense", '2...c6', 'Supports d5, opens c8 bishop', 'Intermediate'],
                  ["Semi-Slav", '2...c6 3...e6', 'Diamond structure, complex', 'Advanced'],
                  ["Tarrasch", '2...c5', 'Counter-attack center', 'Intermediate'],
                ],
              },
              {
                type: 'heading',
                content: "White's Strategic Goals",
              },
              {
                type: 'numbered-list',
                items: [
                  'Establish a strong center with d4 + e4 (the "ideal" center)',
                  "Develop pieces actively — Nc3, Nf3, Bf4 or Bg5",
                  "Use the c-file after cxd5 to generate queenside pressure",
                  "Convert spatial advantage into endgame superiority",
                  "Target the isolated d-pawn if Black plays ...c5 at any point",
                ],
              },
              {
                type: 'callout',
                calloutType: 'info',
                content: "2...dxc4 is not actually bad — after 3.e3 b5 4.a4, the position becomes very complex. But holding the pawn long-term is almost impossible for Black, so acceptance is more of a temporary pawn grab than a real gambit.",
              },
              {
                type: 'paragraph',
                content: "In 2020, The Queen's Gambit miniseries on Netflix caused a massive surge in chess popularity worldwide, increasing online chess registrations by over 600%. Appropriately, the opening it's named after remains one of the most instructive for beginners to study.",
              },
            ],
          },
        ],
      },
      {
        id: 'endgame-techniques',
        sectionId: 'chess',
        title: 'Endgame Techniques',
        description: 'The science of converting advantages — where calculation meets precision arithmetic.',
        entries: [
          {
            id: 'king-pawn-endgames',
            topicId: 'endgame-techniques',
            sectionId: 'chess',
            slug: 'king-pawn-endgames',
            title: 'King and Pawn Endgames',
            subtitle: 'The foundation of all endgame study — opposition, zugzwang, and the key square principle.',
            date: '2025-02-18',
            difficulty: 'intermediate',
            tags: ['endgames', 'king', 'pawn', 'opposition', 'zugzwang'],
            readTime: '15 min',
            content: [
              {
                type: 'paragraph',
                content: "King and pawn endgames are the bedrock of endgame theory. Unlike middlegames where tactical fireworks dominate, K+P endgames reward precise geometric thinking. An error of one tempo or one square is often the difference between winning and drawing.",
              },
              {
                type: 'heading',
                content: 'Opposition',
              },
              {
                type: 'paragraph',
                content: "Two kings are in opposition when they face each other with exactly one square between them. The player who does NOT have to move holds the opposition — their king's presence restricts the opposing king. Opposition is the fundamental concept in all king-and-pawn endings.",
              },
              {
                type: 'table',
                headers: ['Concept', 'Definition', 'Application'],
                rows: [
                  ['Direct Opposition', 'Kings on same rank/file, 1 sq apart', 'Penetrate enemy position; stop pawn'],
                  ['Diagonal Opposition', 'Kings on same diagonal, 1 sq apart', 'Zugzwang setups in complex endings'],
                  ['Distant Opposition', 'Kings separated by odd number of sqs', 'Reduce to direct opposition'],
                  ['Zugzwang', 'Forced to move into a losing position', 'Cornerstone of K+P technique'],
                  ['Key Squares', 'Squares where winning king wins regardless', 'Pawn 2 ranks ahead: 3 key sqs'],
                ],
              },
              {
                type: 'subheading',
                content: 'The Rule of the Square',
              },
              {
                type: 'paragraph',
                content: 'Without considering the defending king, draw a square from the pawn to the queening square. If the defending king can step inside this square on their turn, they catch the pawn; if not, the pawn queens. This calculation is instantaneous once mastered.',
              },
              {
                type: 'list',
                items: [
                  'Rook pawns (a/h-files) are drawn even with the superior king ahead — the defending king reaches the corner',
                  'With king in front of the pawn: win (most cases)',
                  'With king beside or behind the pawn: requires opposition to win',
                  'Passed pawn + connected passed pawn: usually winning without king help',
                ],
              },
              {
                type: 'callout',
                calloutType: 'tip',
                content: 'Activate your king as early as the endgame begins — before all pieces are exchanged. A king that reaches the fifth rank in the endgame is worth more than a bishop or knight.',
              },
            ],
          },
          {
            id: 'rook-endgame-fundamentals',
            topicId: 'endgame-techniques',
            sectionId: 'chess',
            slug: 'rook-endgame-fundamentals',
            title: 'Rook Endgame Fundamentals',
            subtitle: "The most common endgame type. Lucena, Philidor, and why rooks belong behind passed pawns.",
            date: '2025-03-05',
            difficulty: 'advanced',
            tags: ['endgames', 'rooks', 'lucena', 'philidor', 'technique'],
            readTime: '17 min',
            content: [
              {
                type: 'paragraph',
                content: "Rook endgames are the most frequently occurring endgame type in practice — approximately 10% of all competitive games reach some form of rook endgame. Mastering the two fundamental positions (Lucena and Philidor) and the principle of rook activity provides a decisive practical edge.",
              },
              {
                type: 'heading',
                content: 'Rook Activity: The Iron Rule',
              },
              {
                type: 'list',
                items: [
                  'Active rook (attacking behind enemy pawns or on open files) > passive rook',
                  'Place your rook BEHIND passed pawns (yours or theirs)',
                  'Rooks need open files — create them or penetrate to the 7th rank',
                  'The "seventh rank absolute" rook paralyzes enemy position',
                  'Cut off the enemy king from the passed pawn (Lucena principle)',
                ],
              },
              {
                type: 'subheading',
                content: 'The Philidor Position (Defending)',
              },
              {
                type: 'paragraph',
                content: "With Rook + Pawn vs Rook, if the defending side cannot hold the Philidor position they will lose. The defender places their rook on the third rank (cutting off the attacking king), then when the king advances past the pawn, switches to checking from behind. This is the most important rook ending to know.",
              },
              {
                type: 'table',
                headers: ['Position', 'Key Move', 'Outcome', 'Difficulty'],
                rows: [
                  ['Philidor (defend)', 'Rook on 3rd rank, switch to checks', 'Draw with correct play', 'Must know'],
                  ['Lucena (win)', 'Build a bridge with rook', 'Win with correct play', 'Must know'],
                  ['Rook + 2 pawns vs Rook', 'Activate rook, push pawns', 'Usually win', 'Intermediate'],
                  ['Rook pawn endings', 'Often drawn even up material', 'Draw with correct play', 'Tricky'],
                ],
              },
              {
                type: 'callout',
                calloutType: 'insight',
                content: "Grandmaster Edmar Mednis said: 'In rook endings, activity of the rook is more important than material.' A rook with no scope is nearly worthless; an active rook behind an enemy passed pawn controls the entire ending.",
              },
              {
                type: 'paragraph',
                content: "The Lucena position win technique — 'building a bridge' — involves using your own rook to shield your king from checks, allowing the pawn to promote. It is the winning blueprint for Rook + Pawn vs Rook, and the first position every serious chess student must memorize.",
              },
            ],
          },
        ],
      },
    ],
  },
]

// ─── Derived helpers ────────────────────────────────────────────────────────

export const getAllEntries = () =>
  curriculum.flatMap(s => s.topics.flatMap(t => t.entries))

export const getRecentEntries = (count = 5) =>
  getAllEntries()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)

export const getSectionById = (id: string) =>
  curriculum.find(s => s.id === id)

export const getEntryBySlug = (slug: string) =>
  getAllEntries().find(e => e.slug === slug)

export const getTopicById = (sectionId: string, topicId: string) =>
  getSectionById(sectionId)?.topics.find(t => t.id === topicId)

export const getTotalStats = () => {
  const entries = getAllEntries()
  const problems = entries.reduce(
    (acc, e) => acc + e.content.filter(b => b.type === 'problem').length,
    0
  )
  return {
    totalEntries: entries.length,
    disciplines: curriculum.length,
    topics: curriculum.reduce((a, s) => a + s.topics.length, 0),
    problemsSolved: problems,
  }
}
