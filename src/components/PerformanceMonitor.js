import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            console.log('LCP:', entry.startTime);
            break;
          case 'first-input':
            console.log('FID:', entry.processingStart - entry.startTime);
            break;
          case 'layout-shift':
            if (!entry.hadRecentInput) {
              console.log('CLS:', entry.value);
            }
            break;
          default:
            break;
        }
      });
    });

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observer.observe({ entryTypes: ['first-input'] });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const logMemoryUsage = () => {
        const memory = performance.memory;
        console.log('Memory Usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        });
      };

      // Log memory usage every 30 seconds
      const memoryInterval = setInterval(logMemoryUsage, 30000);

      return () => {
        clearInterval(memoryInterval);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  // Monitor long tasks
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long Task detected:', entry.duration + 'ms');
          }
        });
      });

      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long Task Observer not supported');
      }

      return () => longTaskObserver.disconnect();
    }
  }, []);

  // Monitor resource loading
  useEffect(() => {
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 1000) {
          console.warn('Slow resource:', entry.name, entry.duration + 'ms');
        }
      });
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource Observer not supported');
    }

    return () => resourceObserver.disconnect();
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;