import { motion } from "framer-motion";

interface LinkProps {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function Link({ href, title, description, icon }: LinkProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-4 bg-card hover:bg-accent rounded-link border border-border transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-xl">{icon}</div>}
        <div>
          <h2 className="font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </motion.a>
  )
}
