# pivot-table
A basic pivot table representing a store sales grouped in categories and subcategories in different states.

## Download
Download Zip folder from github or clone from github using the command: 
`git clone https://github.com/GeekSilver/pivot-table.git`

## Install Dependencies
Run the command `npm install` or `yarn install` in root directory.

## Build
Run the command  `npm run build` or `yarn build`
This build the app for production to the `build` folder.

## Run the App
Ensure you have node installed in your PC. 
Run the command `npm install -g serve` to install `serve`.
Then run `serve -s build`  to serve the static site on port 5000.
You can adjust the port where the build app runs to a different port using `-l` `--listen` flags.
Run the command. `serve -s build -l <different-port>`
You can as well run `serve -h` to get full list of available options.

## Architectural Overview
- Normalize data into Entities (arrays of a single entity type) with the primary keys being the array indices.
- Build relationships between different Entities through Foreign Keys (have a primary key of one entity become a column dimension in another entity).
- Create Composite Keys (primary keys made up of more than one dimension) for easier filtering during summation or aggregation functions.
- Include an hook option to load data fetched from API's. The hook has a url parameter. You can assign the `JSONData` prop in App.js the value returned by the hook.


## Assumptions
- Converted a section of the provided JSON data to a JS Array constant which made it easier for development as the provied JSON was 'too large'.
- Rounded off summation results to nearest whole number. 
- This made the precision of sum to be close to but not equal to the precise result which in most cases was a floating point figure.
- Assumed category and sub-category dimensions to be constant row dimensions (of prime interest).
- Metric can be easily configured by code. E.g `order.sales` can be swapped for `order.profit` in the entire project files to tabulate profit.

## Next Steps
If this were a real project I would:
- Ensure better precision using consistent floating point degree of accuracy e.g using `toFixed(2)`.
- Add a more convenient way of configuring metric.
- Loosen the tightly coupled category and sub-category row implementation to allow for dimension configuring by code using a `dimension.config.js` file.
- Use more property-agnostic way of calculating sum i.e drop `if ... else` statements tied to few properties in favour of object destructuring to obtain properties of interest dynamicaly.
- Polish up the User Inteface with attention to detail including better support for accessibility and refactor code to extract better components.
- Accommodate new requirements if any.