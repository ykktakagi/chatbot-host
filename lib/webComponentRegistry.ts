export interface ComponentConfig {
  name: string;
  url: string;
  elementName: string;
  version: string;
  dependencies?: string[];
}

export interface ComponentUsage {
  componentName: string;
  timestamp: Date;
  context: string;
  userQuery: string;
  success: boolean;
}

class WebComponentRegistry {
  private components = new Map<string, ComponentConfig>();
  private loadedComponents = new Set<string>();
  private usageLog: ComponentUsage[] = [];

  registerComponent(config: ComponentConfig) {
    this.components.set(config.name, config);
  }

  async loadComponent(name: string): Promise<boolean> {
    if (this.loadedComponents.has(name)) {
      return true;
    }

    const config = this.components.get(name);
    if (!config) {
      console.error(`Component ${name} not found in registry`);
      return false;
    }

    try {
      const script = document.createElement('script');
      script.src = config.url;
      script.type = 'module';
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      this.loadedComponents.add(name);
      return true;
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
      return false;
    }
  }

  logUsage(usage: ComponentUsage) {
    this.usageLog.push(usage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('componentUsage', JSON.stringify(this.usageLog));
    }
  }

  getUsageStats(componentName?: string) {
    const logs = componentName 
      ? this.usageLog.filter(log => log.componentName === componentName)
      : this.usageLog;
    
    return {
      totalUsage: logs.length,
      successRate: logs.length > 0 ? logs.filter(log => log.success).length / logs.length : 0,
      recentUsage: logs.filter(log => 
        Date.now() - log.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
      ).length
    };
  }

  getComponentRecommendations(context: string): string[] {
    const contextLogs = this.usageLog.filter(log => 
      log.context.includes(context) && log.success
    );
    
    const componentCounts = new Map<string, number>();
    contextLogs.forEach(log => {
      componentCounts.set(log.componentName, (componentCounts.get(log.componentName) || 0) + 1);
    });

    return Array.from(componentCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
  }
}

export const componentRegistry = new WebComponentRegistry();
