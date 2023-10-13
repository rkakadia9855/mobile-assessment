* Code is well structured and cleanly written for features. It appropriately uses store to dispatch actions when a user triggers an event and also uses selectors to derive data from the state
 * The code for creating actions uses props for action payloads which ensures type safety and can make it easier to catch errors
 * Appropriate documentation is missing for most files
 * The BookSearchComponent rightly subscribes to store.select to retrieve the list of books, however, it doesn't later unsubscribe from the observable. This could result into memory leak and possibly buggy code. To prevent that, we can unsubscribe from the observable when the component is destroyed.
     * I have added code to unsubscribe from the observable when the ngOnDestroy lifecycle hook is executed.
 * After searching for a term, when we clear the search bar (without submitting the cleared search bar) and start typing a new search term, the results of the previous search is displayed before we submit our new search term. This could create confusion among some users and could be a bad user experience.
     * I have added code which can track the input change in the search bar and dispatch the clearSearch action if the search term is empty

 * Accessibility issues found in lighthouse automated scan:
     * Buttons do not have an accessible name
     * Background and foreground colors do not have a sufficient contrast ratio.
 * Other accessibility issues found manually:
     * The link to "Javascript" in the example text is not reachable with interactive controls
     * Interactive elements do not indicate their purpose and state
     * If custom controls have associated labels
 * All of these identified accessibility issues have been fixed and I have received a score of 100 for accesibility in lighthouse automated scan