<table>
  <tr>
    <th><h3 align="center" >Prerequisites</h3></th>
    <th><h3 align="center">Test case ID</h3></th>
    <th><h3 align="center">Test Case Title</h3></th>
    <th><h3 align="center">Precondition</h3></th>
    <th><h3 align="center">Test Steps</h3></th>
    <th><h3 align="center">Expected Result</h3></th>
  </tr>
  <tr>
    <td rowspan="16">- Have a web browser installed (e.g Chrome, Firefox, ...)</br>- Have internet connection</th>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-01</td>
    <td>Verify input fields accept valid inputs</td>
    <td rowspan="15">1. Open the browser</br>2. Navigate to the URL (https://raksul.github.io/recruit-qa-engineer-work-sample/)</td>
    <td>1. Fill all fields with valid inputs</td>
    <td>All fields accept and display the valid inputs</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-02</td>
    <td>Verify checkbox can be checked</td>
    <td>1. Check the checkbox</td>
    <td>The checkbox is checked</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-03</td>
    <td>Verify checkbox can be unchecked</td>
    <td>1. Uncheck the checkbox</td>
    <td>The checkbox is unchecked</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-04</td>
    <td>Verify dropdown list option can be selected</td>
    <td>1. Click on the dropdown list</br>2. Select an option from the dropdown list</td>
    <td>The selected option is displayed in the dropdown list</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-05</td>
    <td>Verify radio button can be selected</td>
    <td>1. Select a radio button</td>
    <td>The radio button is selected</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-06</td>
    <td>Verify form submission with all valid inputs and selections</td>
    <td>1. Fill all fields with valid inputs</br>2. Check any checkbox</br>3. Select a radio button</br>4. Select an option from the dropdown list</br>5. Click on the submit button</td>
    <td>Form is submitted successfully</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-07</td>
    <td>Verify form submission with missing and invalid inputs and selections</td>
    <td>1. Fill some fields with invalid inputs<br>2. Leave the checkbox unchecked<br>3. Leave all radio buttons unselected<br>4. Leave the dropdown list unselected<br>5. Click on the submit button</td>
    <td>Form submission fails with errors indicating the missing and invalid inputs and selections</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-08</td>
    <td>Verify form submission with invalid email</td>
    <td>1. Fill all fields with valid inputs except for the email field</br>2. Check any checkbox</br>3. Select a radio button</br>4. Select an option from the dropdown list</br>5. Enter an invalid email in the email field</br>6. Click on the submit button</td>
    <td>Form submission fails with an error indicating the invalid email</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-09</td>
    <td>Verify form submission with unchecked checkbox</td>
    <td>1. Fill all fields with valid inputs</br>2. Leave the checkbox unchecked</br>3. Select a radio button</br>4. Select an option from the dropdown list</br>5. Click on the submit button</td>
    <td>Form submission fails with an error indicating the unchecked checkbox</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-10</td>
    <td>Verify form submission without selecting option from the dropdown list</td>
    <td>1. Fill all fields with valid inputs</br>2. Check any checkbox</br>3. Select a radio button</br>4. Leave the dropdown list empty</br>5. Click on the submit button</td>
    <td>Form submission fails with an error indicating the unchecked checkbox</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-11</td>
    <td>Verify form submission with no radio button selected</td>
    <td>1. Fill all fields with valid inputs</br>2. Check any checkbox</br>3. Leave all radio buttons unselected</br>4. Select an option from the dropdown list</br>5. Click on the submit button</td>
    <td>Form submission fails with an error indicating the unselected radio buttons</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-12</td>
    <td>Verify form submission with maximum input length</td>
    <td>1. Fill all fields with maximum allowed length</br>2. Click on the submit button</td>
    <td>Form is submitted successfully</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-13</td>
    <td>Verify form submission with input length exceeding the maximum limit</td>
    <td>1. Fill any field with input length exceeding the maximum limit</br>2. Click on the submit button</td>
    <td>Form submission fails with an error indicating the input length limit</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-14</td>
    <td>Verify form is reset when reload the page</td>
    <td>1. Fill all fields with valid inputs</br>2. Check any checkbox</br>3. Select a radio button</br>4. Select an option from the dropdown list</br>5. Reload the page</td>
    <td>All fields and dropdown list are empty, radio buttons and checkboxes are not selected</td>
  </tr>
  <tr>
    <td>RAKSUL-FORM-FT-15</td>
    <td>Verify form can not be submitted without the internet</td>
    <td>1. Fill all fields with valid inputs</br>2. Check any checkbox</br>3. Select a radio button</br>4. Select an option from the dropdown list</br>5. Disconnect the internet on the device under test</br>6. Click on the submit button</td>
    <td>Form submission fails with an error indicating the error with internet connection</td>
  </tr>
</table>
