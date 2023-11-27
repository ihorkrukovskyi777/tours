export default function DropdownSearch() {
  return (
    <form autoComplete="off"> 
                  <label> 
                    <input name="q" id="q" type="text" placeholder="Where Are You Going?" /> 
                  </label>
                  <div id="result"></div>
    </form>
  )
}
