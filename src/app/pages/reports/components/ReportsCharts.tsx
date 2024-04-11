import { useEffect, useRef, FC } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { useThemeMode } from '../../../../_metronic/partials';
import {
  getCSS,
  getCSSVariableValue,
} from '../../../../_metronic/assets/ts/_utils';
import { ReportsChartsProps } from './reportsModels';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';

const ReportsCharts: FC<ReportsChartsProps> = ({ chosenReports }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode, chosenReports]);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, 'height'));

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, chosenReports)
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  return (
    <div className="card mb-15">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Recent Statistics
          </span>
          {/*<span className="text-muted fw-semibold fs-7">
            More than 400 new members
          </span>*/}
        </h3>
      </div>
      <div className="card-body">
        <div
          ref={chartRef}
          id="kt_charts_widget_1_chart"
          style={{ height: '350px' }}
        />
        <div
          className="d-flex justify-content-around"
          style={{ paddingLeft: '70px' }}
        >
          {chosenReports.map((report, index) => (
            <div key={index} className="d-flex flex-column align-items-center">
              <img
                src={
                  report?.icon
                    ? report?.icon
                    : toAbsoluteUrl('media/auth/404-error.png')
                }
                alt=""
                style={{ width: '64px', height: '64px', marginBottom: '5px' }}
              />
              <span>{report?.ad_name?.substring(0, 8) + '...'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ReportsCharts };

function getChartOptions(height: number, chosenReports: any[]): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-success');
  const chartColor = getCSSVariableValue('--bs-warning');
  const chartColorSecondary = getCSSVariableValue('--bs-danger');
  const chartColorPurple = getCSSVariableValue('--bs-info');

  const transformKey = (key: string) => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  const seriesData = Object.keys(chosenReports[0])
    .map((key) => {
      if (key === 'ad_name' || key === 'icon') {
        return null;
      }

      return {
        name: transformKey(key),
        data: chosenReports.map((report) => {
          return typeof report[key] === 'string'
            ? parseFloat(report[key])
            : report[key];
        }),
      };
    })
    .filter((item) => item !== null);

  const categories = chosenReports.map((report) => {
    if (report?.ad_name?.length > 8) {
      return report?.ad_name?.substring(0, 8) + '...';
    } else {
      return report?.ad_name;
    }
  });

  return {
    series: seriesData as ApexAxisChartSeries,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '1px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },

    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + '';
        },
      },
    },
    colors: [
      baseColor,
      secondaryColor,
      chartColor,
      chartColorSecondary,
      chartColorPurple,
    ],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}
