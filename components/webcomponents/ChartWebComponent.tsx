import React from 'react';
import { createRoot } from 'react-dom/client';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartWebComponentProps {
  chartTitle?: string;
  chartType: 'line' | 'bar';
  dataKey: string;
  source?: string;
  targetYear?: number;
  prefectureCode?: number;
  prefecture?: string;
  localGovCode?: number;
  localGov?: string;
  axisConfig?: any;
  style?: React.CSSProperties;
}

function ChartComponent(props: ChartWebComponentProps) {
  const generateMockData = () => {
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    return years.map(year => ({
      year,
      [props.dataKey]: Math.floor(Math.random() * 1000) + 500
    }));
  };

  const data = generateMockData();
  const ChartType = props.chartType === 'line' ? LineChart : BarChart;
  const DataComponent = props.chartType === 'line' ? Line : Bar;

  return (
    <div style={props.style}>
      <h3>{props.chartTitle}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ChartType data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <DataComponent 
            dataKey={props.dataKey} 
            stroke="#8884d8" 
            fill="#8884d8"
          />
        </ChartType>
      </ResponsiveContainer>
    </div>
  );
}

class ChartWebComponent extends HTMLElement {
  private root: any;

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);
    this.root = createRoot(mountPoint);
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  render() {
    const props = JSON.parse(this.getAttribute('props') || '{}');
    this.root.render(<ChartComponent {...props} />);
  }
}

if (typeof window !== 'undefined') {
  customElements.define('remap-chart', ChartWebComponent);
}
