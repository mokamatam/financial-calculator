
// display the result to the screen
let total_amount_para = document.getElementById("total_amount");
let total_amount_invested_para = document.getElementById("total_amount_invested");
let change_para = document.getElementById("change");
let inflationary_loss_para = document.getElementById("inflationary_loss");
let effective_returns_para = document.getElementById("effective_returns");
let more_details_para = document.getElementById("more_details");
let more_details_header_para = document.getElementById("more_details_header");
more_details_header_para.style.visibility = "hidden";
let results_para = document.getElementById("results");
let time_invested;
let initial_investment;
let monthly_investment;
let expected_annual_returns;
let effective_interest_per_month;
let annual_inflation_rate;
let effective_inflation_rate_per_month;
let investment_made_at_start_or_end_of_the_month;

function change_result_on_click () {
  // accessing all the inputs from the form
  initial_investment = parseInt(document.getElementById("initial_investment_input_number").value) ? parseInt(document.getElementById("initial_investment_input_number").value) : 0;
  monthly_investment = parseInt(document.getElementById("monthly_investment_input_number").value) ? parseInt(document.getElementById("monthly_investment_input_number").value) : 0;

  // expected_annual_returns and effective_interest_per_month
  expected_annual_returns = parseInt(document.getElementById("expected_annual_returns_input_number").value);
  effective_interest_per_month = expected_annual_returns / 1200;
  
  // time_invested and annual_inflation_rate
  time_invested = parseInt(document.getElementById("time_invested_input_number").value);
  annual_inflation_rate = parseInt(document.getElementById("annual_inflation_rate_input_number").value) ? parseInt(document.getElementById("annual_inflation_rate_input_number").value) : 0;

  effective_inflation_rate_per_month = (annual_inflation_rate / 1200);

  investment_made_at_start_or_end_of_the_month =  document.querySelector('input[name="investment_made_at_the_start_or_end_of_the_month"]:checked').value;

  // calculating results
  let total_amount = (calculate_lumpsum_investment_returns(initial_investment, effective_interest_per_month, time_invested) + calculate_monthly_investment_returns(monthly_investment, effective_interest_per_month, time_invested, investment_made_at_start_or_end_of_the_month)).toFixed(2);
  let total_amount_invested = (initial_investment + monthly_investment * time_invested).toFixed(2);
  let change = (total_amount - total_amount_invested).toFixed(2);
  let inflationary_loss = ((calculate_lumpsum_investment_returns(initial_investment, effective_inflation_rate_per_month, time_invested) + calculate_monthly_investment_returns(monthly_investment, effective_inflation_rate_per_month, time_invested, investment_made_at_start_or_end_of_the_month)) - total_amount_invested).toFixed(2);

  let effective_returns = (change - inflationary_loss).toFixed(2);

  // changing the content of the paragraphs to display results
  results_para.innerHTML = "<h3>Results</h3>";
  total_amount_para.innerHTML = "total amount = " + total_amount;
  total_amount_invested_para.innerHTML = "total amount invested = " + total_amount_invested;
  change_para.innerHTML = "returns = " + change;
  inflationary_loss_para.innerHTML = "inflationary losses = " + inflationary_loss;
  effective_returns_para.innerHTML = "effective returns = " + effective_returns;
  more_details_header_para.style.visibility = "visible";
};

// function to calculate_monthly_investment_returns
function calculate_monthly_investment_returns (monthly_investment, effective_interest_per_month, time_invested, investment_made_at_start_or_end_of_the_month) {
  if (investment_made_at_start_or_end_of_the_month === "start") {
   return monthly_investment * ((Math.pow((1 + effective_interest_per_month), time_invested) - 1)) * ((1+effective_interest_per_month)/effective_interest_per_month)
  }
 
  if (investment_made_at_start_or_end_of_the_month === "end") {
    return (monthly_investment * ((Math.pow((1 + effective_interest_per_month), time_invested - 1) - 1)) * ((1+effective_interest_per_month)/effective_interest_per_month)) + monthly_investment;
  }
}

function calculate_lumpsum_investment_returns (initial_investment, effective_interest_per_month, time_invested) {
  return initial_investment * Math.pow((1+effective_interest_per_month), time_invested);
}

function show_more_details () {
  remove_old_details();
  for (let i = 1; i <= time_invested; i++) {
    let para_element = document.createElement("p");
    let line_break = document.createElement("br");
    let node = document.createTextNode( "after " + i + " month(s) ");
    let current_total_amount = (calculate_lumpsum_investment_returns(initial_investment, effective_interest_per_month, i) + calculate_monthly_investment_returns(monthly_investment, effective_interest_per_month, i, investment_made_at_start_or_end_of_the_month)).toFixed(2);
    let current_total_amount_invested = (initial_investment + monthly_investment * i).toFixed(2);
    let current_returns = (current_total_amount - current_total_amount_invested).toFixed(2);

    let calculations = document.createTextNode("total amount = " + current_total_amount + ", invested = " + current_total_amount_invested + ", returns = " + current_returns);
    para_element.appendChild(node);
    para_element.appendChild(line_break);
    para_element.appendChild(calculations);

    more_details_para.appendChild(para_element);
  }
}

function remove_old_details () {
	var last_detail = more_details_para.lastElementChild;
	
	while(last_detail) {
		more_details_para.removeChild(last_detail);
		last_detail = more_details_para.lastElementChild;
	}
}

