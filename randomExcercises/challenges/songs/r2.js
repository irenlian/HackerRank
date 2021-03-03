function collectGroup(related, index, peopleCheckedEarlier) {
  let peopleChecked = [];
  const person = related[index];
  for (let i = 0; i < index; i++) {
    if (person[i] === '1' && peopleChecked.indexOf(i) !== -1 && peopleCheckedEarlier.indexOf(i) !== -1) {
      // Add current relationship
      peopleChecked.push[i];
      // Recursively search for connections
      peopleChecked = [...peopleChecked, ...collectGroup(related, i, [...peopleChecked, ...peopleCheckedEarlier])];
    }
  }
  return peopleChecked;
}

function countGroups(related) {
  console.log(related);
  // Initialize the array where to store the checked people
  let peopleChecked = [];
  let groups = 0;
  for (let i = 0; i < related.length; i++) {
    // Check if we already added this person
    if (peopleChecked.indexOf(i) !== -1) {
      continue;
    }
    // Collect all relationships
    const group = collectGroup(related, i, peopleChecked);
    // If there are any people, they create a group
    if (group.length > 0) {
      peopleChecked = [...peopleChecked, ...group];
      groups++;
    }
  }
  return groups;
}

console.log(countGroups([ '1100', '1110', '0110', '0001' ]))
