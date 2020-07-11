export const getCommunities = state => state.fetchCommunities.communities;
export const getStatus = state => state.fetchCommunities.status;
export const getSelectedCommunityId = state => state.selectCommunity.id;
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
export const getCommunityByIndex = index => state => state.fetchCommunities.communities[index];
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
  return state.apartmentsFetch.apartments[community_id] || [];
}

export const getSelectedApartmentUnit = state => state.apartmentsFetch.selectedApartment;

export const getShowApartmentUnitModal = state => state.apartmentsFetch.showModal;