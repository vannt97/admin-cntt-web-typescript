import { toLowerCaseNonAccentVietnamese } from "../../utils/StringUtil";

interface PropsSearch {
  datas: [];
  typesSearch?: string[];
  callback: Function;
}

export default function Search(props: PropsSearch) {
  return (
    <div id="dataTable_filter" className="dataTables_filter">
      <label>
        Search:
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder=""
          aria-controls="dataTable"
          onChange={(e) => {
            let datasFilted = props.datas.filter((data) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              if (props.typesSearch) {
                let index = props.typesSearch.findIndex((type) => {
                  let text = toLowerCaseNonAccentVietnamese(
                    data[type] as string
                  );
                  return text.toLowerCase().includes(e.currentTarget.value);
                });
                if (index != -1) {
                  return true;
                }
              }
            });
            props.callback(datasFilted);
          }}
        />
      </label>
    </div>
  );
}
