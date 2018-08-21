import React from "react";

class MultiSelectList extends React.Component {
  state = {
    selected: []
  };

  handleSelect(key) {
    this.setState({ selected: [key] });
  }

  render() {
    const { items, getKey, renderItem } = this.props;
    const { selected } = this.state;

    return (
      <div>
        {items.map((item, index) => {
          const key = getKey(item, index);
          return (
            <div key={key} onClick={() => this.handleSelect(key)}>
              {renderItem({ item, selected: selected.indexOf(key) !== -1 })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MultiSelectList;
