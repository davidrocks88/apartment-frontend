export const getCommunities = state => state.communities.communities;
export const getStatus = state => state.communities.status;
export const getSelectedCommunityId = state => state.communities.selectedCommunityId;
export const getSelectedCommunity = state => {
  const communities = getCommunities(state);
  const id = getSelectedCommunityId(state);
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
export const getCommunityByIndex = index => state => state.communities.communities[index];
export const getCommunityById = community_id => state => {
  const communities = getCommunities(state);
  if (communities) {
   const matches = communities.filter(c=>c.community_id === community_id);
   if (matches) {
     return matches[0];
   }
  }
}

export const getApartmentsByCommunityId = community_id => state => {
  return state.apartments.apartments[community_id] || [];
}

export const getSelectedApartmentUnit = state => state.apartments.selectedApartment;

export const getShowApartmentUnitModal = state => state.apartments.showModal;