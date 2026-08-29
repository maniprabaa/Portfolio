export const SKILL_CATEGORIES = [
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'integration', label: 'INTEGRATION & APIS' },
  { id: 'payments', label: 'PAYMENTS' },
  { id: 'database', label: 'DATABASE' },
];

export function groupSkillsByCategory(skills) {
  const grouped = {};
  for (const cat of SKILL_CATEGORIES) {
    grouped[cat.id] = [];
  }
  for (const skill of skills) {
    const key = skill.category && grouped[skill.category] ? skill.category : 'frontend';
    grouped[key].push(skill);
  }
  return grouped;
}
