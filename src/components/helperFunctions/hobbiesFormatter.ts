export const hobbiesFormatter = (hobbies, selectedHobbies) => {
  Object.entries(hobbies).forEach(([k, v]) => {
    if (v.active) {
      if (!selectedHobbies.includes(k)) {
        selectedHobbies = [...selectedHobbies, k];
      }
    }
  });
  return selectedHobbies;
};
