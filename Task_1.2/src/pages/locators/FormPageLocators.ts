export const FormPageLocators = {
  emailInput: '#form_item_email',
  lastNameInput: '#form_item_lastName',
  firstNameInput: '#form_item_firstName',
  infoSourceInput: '//input[@id="form_item_infoSource"]/../..',
  infoSourceList: '//div[@id="form_item_infoSource_list"]/following-sibling::div',
  infoSourceListItem: '//div[@id="form_item_infoSource_list"]/following-sibling::div//div[text()="{Item}"]',
  svcInterestField: '#field_servicesOfInterest',
  assocTypeField: '#form_item_typeOfAssociation',
  expTextArea: '#form_item_explanation'
};
