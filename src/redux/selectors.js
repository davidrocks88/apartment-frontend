export const getCommunities = state => state.fetchCommunities.communities;
export const getStatus = state => state.fetchCommunities.status;
export const getSelectedCommunityId = state => state.selectCommunity;
export const getSelectedCommunity = state => {
  console.log(state);
  const communities = getCommunities(state);
  const id = getSelectedCommunityId(state);
  console.log(id)
  if (id && communities.length) {
    const matches = communities.filter(c=>c.community_id === id);
    if (matches.length) {
      return matches[0];
    }
  }
  else {
    return undefined;
  }
}
export const getCommunityByIndex = index => state => state.fetchCommunities.communities[index];