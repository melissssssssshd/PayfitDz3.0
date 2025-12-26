"use client";

import { useState } from "react";
import {
  Modal,
  Stack,
  Button,
  Group,
  Text,
  Textarea,
  Select,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconBrandWhatsapp,
  IconVideo,
  IconCheck,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface AddInteractionModalProps {
  leadId: string;
  leadName: string;
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INTERACTION_TYPES = [
  { value: "CALL", label: "Appel téléphonique", icon: IconPhone },
  { value: "EMAIL", label: "Email", icon: IconMail },
  { value: "WHATSAPP", label: "WhatsApp", icon: IconBrandWhatsapp },
  { value: "VIDEO", label: "Visio", icon: IconVideo },
] as const;

export function AddInteractionModal({
  leadId,
  leadName,
  opened,
  onClose,
  onSuccess,
}: AddInteractionModalProps) {
  const [interactionType, setInteractionType] = useState<string>("CALL");
  const [content, setContent] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setContent("");
    setInteractionType("CALL");
    onClose();
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      notifications.show({
        title: "Erreur",
        message: "Veuillez saisir le contenu de l'interaction",
        color: "red",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/sales/leads/${leadId}/interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: interactionType,
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'interaction");
      }

      notifications.show({
        title: "Interaction ajoutée",
        message: "L'interaction a été enregistrée avec succès",
        color: "green",
        icon: <IconCheck size={18} />,
      });

      setContent("");
      setInteractionType("CALL");
      onSuccess();
      onClose();
    } catch (error) {
      notifications.show({
        title: "Erreur",
        message: "Impossible d'ajouter l'interaction",
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getPlaceholder = () => {
    switch (interactionType) {
      case "CALL":
        return "Résumé de l'appel, points discutés, prochaines étapes...";
      case "EMAIL":
        return "Sujet et résumé de l'email envoyé...";
      case "WHATSAPP":
        return "Résumé de la conversation WhatsApp...";
      case "VIDEO":
        return "Résumé de la visio, points abordés...";
      default:
        return "Détails de l'interaction...";
    }
  };

  // Find current selected icon component
  const currentType = INTERACTION_TYPES.find((t) => t.value === interactionType);
  const CurrentIcon = currentType?.icon;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={<Text fw={600}>Ajouter une interaction</Text>}
      size="md"
      centered
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Enregistrez une interaction avec <strong>{leadName}</strong>
        </Text>

        <Select
          label="Type d'interaction"
          placeholder="Choisir un type"
          value={interactionType}
          onChange={(value) => setInteractionType(value ?? "CALL")}
          leftSection={CurrentIcon ? <CurrentIcon size={18} /> : null}
          data={INTERACTION_TYPES.map(({ value, label, icon: Icon }) => ({
            value,
            label,
            // Custom data for rendering icon in dropdown
            icon: Icon ? <Icon size={18} /> : null,
          }))}
          itemComponent={({ icon, label }) => (
            <Group gap="xs">
              {icon}
              <Text size="sm">{label}</Text>
            </Group>
          )}
          // Optional: also show icon next to selected label
          renderValue={({ label }) => (
            <Group gap="xs">
              {CurrentIcon && <CurrentIcon size={18} />}
              <Text size="sm">{label}</Text>
            </Group>
          )}
        />

        <Textarea
          label="Détails de l'interaction"
          placeholder={getPlaceholder()}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={5}
          autosize
          required
        />

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={handleClose} disabled={submitting}>
            Annuler
          </Button>
          <Button
            color="payfit.6"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!content.trim() || submitting}
          >
            Enregistrer
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
