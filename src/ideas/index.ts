const ideaModules = import.meta.glob("./*/Idea.vue", { eager: true });
const metaModules = import.meta.glob("./*/meta.ts", { eager: true });

export const ideas = Object.keys(ideaModules).map((key) => {
  const name = key.split("/")[1];

  return {
    name,
    component: (ideaModules as any)[key].default,
    meta: (metaModules as any)[`./${name}/meta.ts`].meta,
  };
});

export const ideaMap = ideas.reduce((acc, idea) => {
  if (idea.name) {
    acc[idea.name] = idea;
  }
  return acc;
}, {} as Record<string, (typeof ideas)[0]>);
