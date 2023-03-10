export const FormClient = `
<form action="http://localhost:3000/api/clients" method="POST">
      <div class="left">
        <div>
          <div class="input-box">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name">
          </div>
          <div class="input-box">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" placeholder="Your Name">
          </div>
        </div>
        <div>
          <div class="input-box">
            <label for="dni">DNI:</label>
            <input type="text" id="dni" name="dni" placeholder="Your DNI">
          </div>
          <div class="input-box">
            <label for="address">Address:</label>
            <input type="text" id="address" name="address" placeholder="Your Address">
          </div>
        </div>
        <div>
          <div class="input-box">
            <label for="city">City:</label>
            <input type="search" list="cities" name="city" placeholder="Your City">
            <datalist id="cities">
              <option value="Bucaramanga"></option>
            </datalist>
          </div>
          <div class="input-box">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone"name="phone" placeholder="Your Phone Number"> 
          </div>
        </div>
        <div>
        ${type === 'create'
          ? `
            <div class="input-box">
              <label for="status">Status:</label>
              <select id="status" id="credit-status" name="status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          `
          : `
          <div class="input-box">
            <label for="contact">Contact:</label>
            <input type='text' id='contact' name='contact' placeholder='Some Contact'>
          </div>
          `}
        </div>
        <input type="submit" class="save" value="Save Changes">
      </div>
      <div class="right">
        <div class="input-box">
          <label for="limitCredit">Limit Credit:</label>
          <input type="number" id="limitCredit" name="limitCredit" placeholder="Your Limit Credit">
        </div>
        <div class="input-box">
          <label for="curerntCredit">Current Credit:</label>
          <input type="number" id="curentCredit" name="currentCredit" placeholder="Your Current Credit">
        </div>
        <div class="input-box">
          <label for="daysGrace">Days of Grace:</label>
          <input type="number" id="daysGrace" name="daysGrace" placeholder="Your Days of grace">
        </div>
      </div>
    </form>
`
