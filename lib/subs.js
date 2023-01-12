async function getSubsData() {
  // https://randomuser.me/documentation#seeds
  const subscribers = await fetch('https://randomuser.me/api/?results=4&seed=yasqueen');
  const {'results': allSubsData} = await subscribers.json();
  return allSubsData;
}

export async function getSortedSubsData() {
  const data = await getSubsData();
  return data.sort((a, b) => {
    if (a.name.last > b.name.last) return 1;
    return -1;
  })
}

export async function getSubData(id) {
  const data = await getSortedSubsData();
  return {
    id,
    ...data.find(sub => { return sub.login.uuid === id })
  };
}

export async function getAllSubIds() {
  const data = await getSortedSubsData();
  return data.map((sub) => {
    return {
      params: {
        id: sub.login.uuid,
      },
    };
  });
}
